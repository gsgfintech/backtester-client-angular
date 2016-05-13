'use strict';

angular.module('backtesterclientApp')
.factory('StratFileUploadService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/strats/file';

    return $resource(address, {}, {
        'save': {
            method: 'POST',
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }
    });
}]);
