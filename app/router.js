import {on} from '@ember/object/evented';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  notifyGoogleAnalytics: on('didTransition', function() {
    if (window.ga) {
      window.ga('send', 'pageview', {page: this.get('url')});
    }
    if (window.Intercom) {
      window.Intercom('update');
    }
    return true;
  }),
});

Router.map(function() {
  this.route('login');
  this.route('join', {path: '/join/:invite_code'});
  this.route('auth-failure', {path: 'auth/failure'});
  this.route('docs', {path: '/docs'}, function() {
    this.route('page', {path: '*path'});
  });
  this.route('pricing');
  this.route('enterprise');
  this.route('about');
  this.route('terms');
  this.route('privacy');
  this.route('security');
  this.route('admin');
  this.route('setup', {path: '/setup'}, function() {
    this.route('github-app');
  });
  this.route('organizations', {path: '/organizations'}, function() {
    this.route('new');
    this.route('organization', {path: '/:organization_id'}, function() {
      this.route('setup');
      this.route('projects', {path: '/projects'}, function() {
        this.route('new');
      });
      this.route('settings');
      this.route('users', function() {
        this.route('invite');
      });
      this.route('billing');
    });
  });
  this.route('organization', {path: '/:organization_id'}, function() {
    // Don't add anything else in this top-level namespace, we want to allow users to own the whole
    // projects namespace. Org-level settings and such should go in the above "organizations" route.
    this.route('project', {path: '/:project_id'}, function() {
      this.route('settings');
      this.route('builds', {}, function() {
        this.route('build', {path: '/:build_id'}, function() {
          this.route('snapshot', {path: '/view/:snapshot_id/:width'});
        });
      });
    });
  });
});

export default Router;
