import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').queryRecord('marketing-page', {
      'fields.pageName': 'HowItWorks',
    });
  },

  actions: {
    didTransition() {
      this._super.apply(this, arguments);
      this.analytics.track('How It Works Viewed');
    },
  },
});
