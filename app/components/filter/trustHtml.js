/**
 *
 * Created by Yjs on 2018/1/5.
 */
angular.module('frontierApp')
  .filter('trustHtml', ['$sce', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    }
  }]);
