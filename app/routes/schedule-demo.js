import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').queryRecord('marketing-page', {
      'fields.pageName': 'ScheduleDemo',
    });
  },

  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      // TODO: Add organization tracking
      this.analytics.track('Schedule Demo Viewed');
    },
  },
});
