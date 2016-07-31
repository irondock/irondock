(function() {

  'use strict';

  angular
    .module('app')
    .controller('ContainersController', controller);

  function controller($scope, $state, dockerApi, moment) {

    $scope.containers = {
      ajax: {
        url: dockerApi.url('/containers/json?all=true'),
        dataSrc: ''
      },
      columns: {
        'Id': 'Container ID',
        'Image': 'Image',
        'Command': 'Command',
        'Created': 'Created',
        'Status': 'Status',
        'Name': 'Name'
      },
      transforms: [{
        targets: 0,
        render: function(i, type, container) {
          return container.Id.substr(0,12);
        }
      }, {
        targets: 3,
        render: function(i, type, container) {
          return moment.unix(container.Created).fromNow();
        }
      }, {
        targets: 5,
        render: function(i, type, container) {
          var name = container.Names[0];
          name = name.replace(/^\//, '');  // trim leading slash
          return name;
        }
      }]
    };

  }

})();
