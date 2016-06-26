/**
 * Libraries defined at global scope can be registered here as constant service.
 * App related constants can also be registered here.
 */

(function(window) {

  'use strict';

  angular
    .module('app')
    .constant('$appInfo', window.appInfo)
    .constant('moment', window.moment)
    .constant('bootbox', window.bootbox)
    .constant('sweetAlert', window.sweetAlert)
    .constant('growl', window.jQuery.jGrowl);

})(this);
