import Component from '@ember/component';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import StripeOptions from 'percy-web/lib/stripe-elements-options';

export default Component.extend({
  subscriptionService: service('subscriptions'),
  stripeService: service('stripev3'),
  store: service(),
  flashMessages: service(),

  tagName: '',
  options: StripeOptions,
  isCardComplete: false,
  isUpdatingCard: false,

  isSaveSuccessful: null,

  // isSaving: readOnly('_updateSubscriptionSavingStatus.isRunning'),
  shouldShowSubmit: readOnly('isCardComplete'),
  shouldShowCardInput: readOnly('isUpdatingCard'),
  planId: readOnly('organization.subscription.plan.id'),

  actions: {
    checkCard(event, cardDetails) {
      this.set('isCardComplete', cardDetails.complete);
    },

    showCardInput() {
      this.set('isUpdatingCard', true);
    },

    updateCreditCard(stripeElement) {
      const promise = this.get('subscriptionService').updateCreditCard.perform(
        stripeElement,
        this.get('organization'),
        this.get('planId'),
      );
      this._updateSubscriptionSavingStatus.perform(promise);
    },
  },

  _updateCreditCard: task(function*(stripeElement) {
    const planId = this.get('planId');
    const response = yield this.get('stripeService').createToken(stripeElement);
    this._changeSubscription(planId, response.token);
  }),

  _changeSubscription(planId, token) {
    const organization = this.get('organization');
    const subscriptionService = this.get('subscriptionService');

    const savingPromise = subscriptionService.changeSubscription(organization, planId, token);
    this.get('_updateSubscriptionSavingStatus').perform(savingPromise);
  },

  _updateSubscriptionSavingStatus: task(function*(savingPromise) {
    this.set('isSaveSuccessful', null);
    this.set('isSaving', true);
    try {
      yield savingPromise;
      this.get('flashMessages').success('Your card was updated successfully!');
      this.setProperties({
        isSaveSuccessful: true,
        isUpdatingCard: false,
        isCardComplete: false,
        isSaving: false,
      });
    } catch (e) {
      this.set('isSaveSuccessful', false);
      this.set('isSaving', false);
    }
  }),
});
