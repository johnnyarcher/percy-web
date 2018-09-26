import Route from '@ember/routing/route';
import metaTagLookup from 'percy-web/lib/meta-tags';

export default Route.extend({
  headTags: metaTagLookup('root'),

  model() {
    return this.get('store').queryRecord('marketing-page', {
      'fields.pageName': 'Home',
    });
  },

  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      // TODO: Add organization tracking
      this.analytics.track('Home Viewed');
    },
  },
});
