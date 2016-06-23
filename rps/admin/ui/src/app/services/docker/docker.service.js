(function() {

  'use strict';

  angular
    .module('app')
    .factory('Docker', function($q, $http) {
      return {
        get: function(endpoint) {
          return $q(function(resolve, reject) {
            $http.get('http://admin.me' + endpoint)
              .success(function(data) {
                resolve(data);
              })
              .error(function(data) {
                reject(data);
              });
          });
        }
      };
    });

})();
