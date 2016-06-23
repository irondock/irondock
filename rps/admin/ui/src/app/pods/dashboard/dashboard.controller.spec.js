(function() {

  'use strict';

  describe('DashboardController', function() {

    var $scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('DashboardController', { $scope: $scope });
    }));

    // it('- should have appInfo object with a name and version attributes', function() {
    //   expect(angular.isObject($scope.appInfo)).toBeTruthy();
    //   expect(typeof $scope.appInfo.name).toBe('string');
    //   expect(typeof $scope.appInfo.version).toBe('string');
    // });

  });

})();
