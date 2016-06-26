(function() {

  'use strict';

  angular
    .module('app')
    .factory('dockerApi', function($settings, $http) {

      var service = {};

      service.get = function(endpoint) {
        return $http.get($settings.API_BASE_URL + endpoint);
      };

      service.post = function(endpoint, data) {
        return $http.post($settings.API_BASE_URL + endpoint, data);
      };

      service.delete = function(endpoint) {
        return $http.delete($settings.API_BASE_URL + endpoint);
      };

      service.url = function(endpoint) {
        return $settings.API_BASE_URL + endpoint;
      };

      return service;
    });

})();
