(function() {

  'use strict';

  angular
    .module('app')
    .factory('dockerApi', function($settings, $http) {

      var service = {};
      var baseUrl = $settings.API_BASE_URL + '/docker';

      service.get = function(endpoint) {
        return $http.get(baseUrl + endpoint);
      };

      service.post = function(endpoint, data) {
        return $http.post(baseUrl + endpoint, data);
      };

      service.delete = function(endpoint) {
        return $http.delete(baseUrl + endpoint);
      };

      service.url = function(endpoint) {
        return baseUrl + endpoint;
      };

      return service;
    });

})();
