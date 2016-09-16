'use strict';

angular.module('backtesterclientApp')
.factory('StratDatapointsService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/algodatapoints/:stratname/:cross/?lowerBound=:lowerBound&upperBound=:upperBound';

    return $resource(address, {
        stratname: 'stratname',
        cross: 'cross',
        lowerBound: 'lowerBound',
        upperBound: 'upperBound'
    });
}])
.factory('StratDatapointsTradedService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/algodatapoints/:stratname/:cross/traded/?lowerBound=:lowerBound&upperBound=:upperBound';

    return $resource(address, {
        stratname: 'stratname',
        cross: 'cross'
    });
}])
.factory('StratDatapointsLatestService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/algodatapoints/:stratname/:cross/latest/';

    return $resource(address, {
        stratname: 'stratname',
        cross: 'cross'
    });
}]);