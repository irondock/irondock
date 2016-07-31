(function() {

  'use strict';

  angular
    .module('app')
    .config(routesConfig);

  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    // Use html5Mode for modern browsers,
    // and fallback to #! for older browsers and search engine crawlers.
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider

    .state('root', {
      abstract: true,
      url: '',
      views: {
        '@': {
          templateUrl: 'layouts/default/default.html'
        }
      },
    })

    .state('rps', {
      parent: 'root',
      url: '/rps',
      views: {
        'main': {
          templateUrl: 'pods/rps/rps.html',
          controller: 'RpsController'
        }
      }
    })

    .state('containers', {
      parent: 'root',
      url: '/containers',
      views: {
        'main': {
          templateUrl: 'pods/containers/containers.html',
          controller: 'ContainersController'
        }
      }
    });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
  }

})();
