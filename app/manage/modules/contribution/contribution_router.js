/**
 * Created by Yjs on 2018/1/2.
 */
'use strict';
angular.module('frontierApp.contribution', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('sidebar.contributionAdd', {// 产品分类管理
        url: '/contributionAdd',
        views: {
          main: {
            templateUrl: 'modules/contribution/contribution_add_view.html',
            controller: 'ContributionAddController'
          }
        }
      })
      .state('sidebar.contributionEdit', {// 产品分类管理
        url: '/contributionEdit',
        views: {
          main: {
            templateUrl: 'modules/contribution/contribution_edit_view.html',
            controller: 'ContributionEditController'
          }
        }
      });
  }]);
