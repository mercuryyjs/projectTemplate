/**
 * Created by Yjs on 2018/1/2.
 */
'use strict';
angular.module('frontierApp.demo', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('sidebar.demoAdd', {// 产品分类管理
        url: '/demoAdd',
        views: {
          main: {
            templateUrl: 'modules/demo/demo_add_view.html',
            controller: 'DemoAddController'
          }
        }
      })
      .state('sidebar.demoEdit', {// 产品分类管理
        url: '/demoEdit',
        views: {
          main: {
            templateUrl: 'modules/demo/demo_edit_view.html',
            controller: 'DemoEditController'
          }
        }
      });
  }]);
