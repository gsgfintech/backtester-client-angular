'use strict';

angular.module('backtesterclientApp')
.factory('JobsService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/:jobName';

    return $resource(address, {
        jobName: '@JobName'
    });
}])
.factory('JobsStatusService', ['$resource', 'serverEnpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/status/:jobName';

    return $resource(address, {
        jobName: '@JobName'
    });
}]);
