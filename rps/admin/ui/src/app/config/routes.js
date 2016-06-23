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

    .state('dashboard', {
      parent: 'root',
      url: '/',
      views: {
        'main': {
          templateUrl: 'pods/dashboard/dashboard.html',
          controller: 'DashboardController'
        }
      },
      controller: 'HomeController'
    });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
  }

})();
