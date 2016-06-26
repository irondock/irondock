(function() {

  'use strict';

  describe('DashboardController', function() {

    var $scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('DashboardController', { $scope: $scope });
    }));

    it('$scope.containers should be an object containing ajax, columns and transforms', function() {
      expect(typeof $scope.containers).toBe('object');
      expect(typeof $scope.containers.ajax).toBe('object');
      expect(typeof $scope.containers.columns).toBe('object');
      // expect(typeof $scope.containers.transforms).toBe('object');
    });

  });

})();
