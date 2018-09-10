import Contentful from 'ember-data-contentful/models/contentful';
import DS from 'ember-data';

export default Contentful.extend({
  contentType: 'logoGroup',

  logos: DS.hasMany('customer-logos'),
});
