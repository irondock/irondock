(function() {

  'use strict';

  angular
    .module('app')
    .run(runBlock);

  function runBlock($log, $appInfo, $rootScope, $state, $timeout) {

    highlightActiveSidenav();

    $log.debug($appInfo.name + ' ' + $appInfo.version);

    /**
     * Hightlight the current (active) page link on the left sidenav
     */
    function highlightActiveSidenav() {
      // This events gets triggered on refresh or URL change
      $rootScope.$on('$stateChangeSuccess', function() {
        var state = $state.current.name;
        $timeout(function() {
          angular.element('.navigation-main > li').removeClass('active');
          angular.element('.navigation-main > li[data-for-states~="' + state + '"]').addClass('active');
        });
      });
    }
  }

})();
