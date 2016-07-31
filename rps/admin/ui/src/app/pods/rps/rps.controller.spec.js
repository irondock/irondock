(function() {

  'use strict';

  describe('RpsController', function() {

    var $scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('RpsController', { $scope: $scope });
    }));

    it('true should be a type of boolean', function() {
      expect(typeof true).toBe('boolean');
    });

  });

})();
