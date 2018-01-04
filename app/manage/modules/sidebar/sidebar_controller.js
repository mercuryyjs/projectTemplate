/**
 * Created by Yjs on 2018/1/2.
 */
// angular.module('frontierApp.sidebar')
'use strict';
angular.module('frontierApp.sidebar')
  .controller('SidebarController', ['$rootScope', '$scope', '$state', '$timeout', '$log', function ($rootScope, $scope, $state, $timeout, $log) {
    $scope.state = $state;
  }]);
