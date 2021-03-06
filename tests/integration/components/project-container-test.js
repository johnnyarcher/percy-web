import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, makeList} from 'ember-data-factory-guy';
import ProjectPage from 'percy-web/tests/pages/project-page';
import sinon from 'sinon';
import setupFactoryGuy from 'percy-web/tests/helpers/setup-factory-guy';

describe('Integration: ProjectContainer', function() {
  setupComponentTest('project-container', {
    integration: true,
  });

  beforeEach(function() {
    setupFactoryGuy(this.container);
    ProjectPage.setContext(this);
  });

  describe('without a repo', function() {
    beforeEach(function() {
      const project = make('project');
      const builds = makeList('build', 1, {buildNumber: 1});
      const isSidebarVisible = false;
      const toggleSidebar = sinon.stub();
      const stub = sinon.stub();
      this.setProperties({project, builds, stub, isSidebarVisible, toggleSidebar});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        isSidebarVisible=isSidebarVisible
        toggleSidebar=toggleSidebar
        isUserMember=true
      }}`);
    });

    it('shows no logo', function() {
      percySnapshot(this.test.fullTitle());
      const project = this.get('project');
      expect(project.get('isRepoConnected')).to.equal(false);
      expect(ProjectPage.repoLinked.githubLogo.isVisible, 'github logo is visible').to.equal(false);
      expect(ProjectPage.repoLinked.gitlabLogo.isVisible, 'gitlab logo is visible').to.equal(false);
    });
  });

  describe('with an empty repo source', function() {
    beforeEach(function() {
      const project = make('project', 'withRepo');
      const builds = makeList('build', 1, 'withRepo', 'hasPullRequest', {buildNumber: 1});
      const isSidebarVisible = false;
      const toggleSidebar = sinon.stub();
      const stub = sinon.stub();
      this.setProperties({project, builds, stub, isSidebarVisible, toggleSidebar});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        isSidebarVisible=isSidebarVisible
        toggleSidebar=toggleSidebar
        isUserMember=true
      }}`);
    });

    it('shows no logo', function() {
      percySnapshot(this.test.fullTitle());
      const project = this.get('project');
      expect(project.get('isRepoConnected')).to.equal(true);
      expect(project.get('isGithubRepo')).to.equal(false);
      expect(project.get('isGithubEnterpriseRepo')).to.equal(false);
      expect(project.get('isGithubRepoFamily')).to.equal(false);
      expect(project.get('isGitlabRepo')).to.equal(false);
      expect(ProjectPage.repoLinked.githubLogo.isVisible, 'github logo is visible').to.equal(false);
      expect(ProjectPage.repoLinked.gitlabLogo.isVisible, 'gitlab logo is visible').to.equal(false);
    });
  });

  describe('with a github repo', function() {
    beforeEach(function() {
      const project = make('project', 'withGithubRepo');
      const builds = makeList('build', 1, 'withGithubRepo', 'hasPullRequest', {buildNumber: 1});
      const isSidebarVisible = false;
      const toggleSidebar = sinon.stub();
      const stub = sinon.stub();
      this.setProperties({project, builds, stub, isSidebarVisible, toggleSidebar});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        isSidebarVisible=isSidebarVisible
        toggleSidebar=toggleSidebar
        isUserMember=true
      }}`);
    });

    it('shows the github logo', function() {
      percySnapshot(this.test.fullTitle());
      const project = this.get('project');
      expect(project.get('isRepoConnected')).to.equal(true);
      expect(project.get('isGithubRepo')).to.equal(true);
      expect(project.get('isGithubEnterpriseRepo')).to.equal(false);
      expect(project.get('isGithubRepoFamily')).to.equal(true);
      expect(project.get('isGitlabRepo')).to.equal(false);
      expect(ProjectPage.repoLinked.githubLogo.isVisible, 'github logo is not visible').to.equal(
        true,
      );
      expect(ProjectPage.repoLinked.gitlabLogo.isVisible, 'gitlab logo is visible').to.equal(false);
    });
  });

  describe('with a github enterprise repo', function() {
    beforeEach(function() {
      const project = make('project', 'withGithubEnterpriseRepo');
      const builds = makeList('build', 1, 'withGithubEnterpriseRepo', 'hasPullRequest', {
        buildNumber: 1,
      });
      const isSidebarVisible = false;
      const toggleSidebar = sinon.stub();
      const stub = sinon.stub();
      this.setProperties({project, builds, stub, isSidebarVisible, toggleSidebar});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        isSidebarVisible=isSidebarVisible
        toggleSidebar=toggleSidebar
        isUserMember=true
      }}`);
    });

    it('shows the github logo', function() {
      percySnapshot(this.test.fullTitle());
      const project = this.get('project');
      expect(project.get('isRepoConnected')).to.equal(true);
      expect(project.get('isGithubRepo')).to.equal(false);
      expect(project.get('isGithubEnterpriseRepo')).to.equal(true);
      expect(project.get('isGithubRepoFamily')).to.equal(true);
      expect(project.get('isGitlabRepo')).to.equal(false);
      expect(ProjectPage.repoLinked.githubLogo.isVisible, 'github logo is not visible').to.equal(
        true,
      );
      expect(ProjectPage.repoLinked.gitlabLogo.isVisible, 'gitlab logo is visible').to.equal(false);
    });
  });

  describe('with a gitlab repo', function() {
    beforeEach(function() {
      const project = make('project', 'withGitlabRepo');
      const builds = makeList('build', 1, 'withGitlabRepo', 'hasPullRequest', {buildNumber: 1});
      const isSidebarVisible = false;
      const toggleSidebar = sinon.stub();
      const stub = sinon.stub();
      this.setProperties({project, builds, stub, isSidebarVisible, toggleSidebar});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        isSidebarVisible=isSidebarVisible
        toggleSidebar=toggleSidebar
        isUserMember=true
      }}`);
    });

    it('shows the gitlab logo', function() {
      percySnapshot(this.test.fullTitle());
      const project = this.get('project');
      expect(project.get('isRepoConnected')).to.equal(true);
      expect(project.get('isGithubRepo')).to.equal(false);
      expect(project.get('isGithubEnterpriseRepo')).to.equal(false);
      expect(project.get('isGithubRepoFamily')).to.equal(false);
      expect(project.get('isGitlabRepo')).to.equal(true);
      expect(ProjectPage.repoLinked.gitlabLogo.isVisible, 'gitlab logo is not visible').to.equal(
        true,
      );
      expect(ProjectPage.repoLinked.githubLogo.isVisible, 'github logo is visible').to.equal(false);
    });
  });

  describe('when user is not member of org', function() {
    beforeEach(function() {
      const project = make('project', 'withGithubRepo');
      const builds = makeList('build', 1);
      const stub = sinon.stub();
      this.setProperties({project, builds, stub});

      this.render(hbs`{{project-container
        project=project
        builds=builds
        pollRefresh=stub
        toggleSidebar=stub
        isUserMember=false
      }}`);
    });

    it('displays notice that build is public', function() {
      expect(ProjectPage.isPublicProjectNoticeVisible).to.equal(true);
      percySnapshot(this.test);
    });
  });
});
