(function() {

  'use strict';

  angular
    .module('app')
    .directive('datatable', directive);

  function directive($timeout, $window) {

    var datatable;

    return {
      restrict: 'E',
      templateUrl: 'directives/datatable/datatable.html',
      link: linkFunc,
      controller: controller,
      scope: {
        data: '='
      }
    };

    function controller($scope) {
      angular.extend($scope, {
        getColumnLabels: function() {
          var labels = [];
          for (var i in $scope.data.columns) {
            labels.push($scope.data.columns[i]);
          }
          return labels;
        },
        getColumnKeys: function() {
          var columns = [];
          for (var i in $scope.data.columns) {
            columns.push({
              data: i
            });
          }
          return columns;
        }
      });

      // call it from outside to fire an ajax-reload
      $scope.data.reload = function(callback) {
        callback = (typeof callback === 'function') ? callback : angular.noop;
        datatable.ajax.reload(callback.bind(null, datatable));
      };
    }

    function linkFunc(scope, el) {
      // suppress error/warning alert
      $window.$.fn.dataTableExt.sErrMode = 'throw';

      $timeout(function() {
        datatable = el.children('.table').first().DataTable({
          paging: true,
          ajax: scope.data.ajax,
          order: scope.data.order ? scope.data.order : [],
          columns: scope.getColumnKeys(),
          columnDefs: scope.data.transforms,
          autoWidth: false,
          dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
          language: {
            search: '<span>Search:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'next': '&rarr;', 'previous': '&larr;' }
          },
        });

        // bind draw event if requested
        if (scope.data.events && scope.data.events.draw) {
          datatable.on('draw.dt', scope.data.events.draw.bind(null, datatable));
        }

        // bind xhr event if requested
        if (scope.data.events && scope.data.events.xhr) {
          datatable.on('xhr.dt', scope.data.events.xhr);
        }

        // when clicked on a row
        el.on('click', 'tbody tr', function() {
          if (!scope.data.events || !scope.data.events.rowclick) { return; }
          var row = datatable.row(this);
          scope.data.events.rowclick(row);
        });

        // renders select2 dropdown (for items per page)
        el.find('.datatable-header select').select2({
          minimumResultsForSearch: -1   // hide searchbox
        });

      }, 1);
    }
  }

})();
