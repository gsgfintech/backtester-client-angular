'use strict';

angular.module('backtesterclientApp')
.factory('StratDatapointsStratnameService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/algodatapointsstratnames';

    return $resource(address);
}]);