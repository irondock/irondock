(function() {

  'use strict';

  angular
    .module('app')
    .controller('DashboardController', controller);

  function controller($scope, $appInfo) {
    $scope.appInfo = $appInfo;
  }

})();
