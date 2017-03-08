'use strict';

angular.module('backtesterclientApp')
    .factory('UnrealizedPnlsByJobNameWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
        var address = serverEndpoint + 'api/unrealizedpnls/:jobName';

        return $resource(address, {
            jobName: '@JobName'
        });
    }])
    .factory('UnrealizedPnlsService', ['$rootScope', 'UnrealizedPnlsByJobNameWebService', function ($rootScope, UnrealizedPnlsByJobNameWebService) {

        var unrealizedPnls = {};

        function getUnrealizedPnls(jobName, err, cb) {
            // 1. Look in history
            if (unrealizedPnls[jobName]) {
                if (cb) {
                    cb(unrealizedPnls[jobName]);
                }
            } else {
                // 2. Query from serverEndpoint
                UnrealizedPnlsByJobNameWebService.get({ jobName: jobName }, function (pnls) {
                    if (pnls) {
                        // 2a. Save in history
                        unrealizedPnls[jobName] = pnls;

                        // 2b. Return
                        if (cb) {
                            cb(pnls);
                        }
                    } else {
                        if (err) {
                            err('Failed to get unrealized pnls for ' + jobName);
                        }
                    }
                });
            }
        }

        return {
            getUnrealizedPnls: getUnrealizedPnls
        };

    }]);
