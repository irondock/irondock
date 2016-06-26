/**
 * App configuration options
 */

(function(window) {

  'use strict';

  angular
    .module('app')
    .config(config)
    .constant('$settings', {

      API_BASE_URL: (function() {
        var url;
        try {
          switch(window.appInfo.environment) {
            case 'development':
              url = 'http://irondock.local/api';
              break;
            case 'production':
              url = 'http://irondock.local/api';
              break;
          }
        } catch(e) {}
        if (!url) {
          window.console.error('API_BASE_URL is ' + url + '. Check constant settings in app/config/constants.js');
        }
        return url;
      })()

    });


  function config($logProvider) {
    // disable debug logs in production
    if (window.appInfo.environment === 'production') {
      $logProvider.debugEnabled(false);
    }
  }

})(this);
