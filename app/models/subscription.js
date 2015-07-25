import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  plan: DS.attr(),
  planName: DS.attr(),
  planUsageLimit: DS.attr('number'),
  currentUsage: DS.attr('number'),

  isFree: Ember.computed.equal('plan', 'free-2'),
  isPaid: Ember.computed.not('isFree'),
});

