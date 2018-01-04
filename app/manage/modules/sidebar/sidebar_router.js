/**
 * Created by Yjs on 2018/1/2.
 */
angular.module('frontierApp.sidebar', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('sidebar', {
        url: '/sidebar',
        templateUrl: 'modules/sidebar/sidebar_view.html',
        controller: 'SidebarController'
      });
  }]);


