'use strict';

angular.module('backtesterclientApp')
.factory('BacktesterClientHubService', ['$rootScope', 'Hub', 'serverEndpoint', function ($rootScope, Hub, serverEndpoint) {

    var ready = false;

    var hub = new Hub('controllerAppHub', {
        rootPath: serverEndpoint + '/signalr',
        listeners: {

            // Alerts
            'newAlertReceived': function (jobName, alert) {
                console.log('Received alert update for', jobName);

                $rootScope.$broadcast('newAlertReceivedEvent', { jobName: jobName, alert: alert });
            },

            // Executions
            'newExecutionReceived': function (jobName, execution) {
                console.log('Received trade update for', jobName);

                $rootScope.$broadcast('newExecutionReceivedEvent', { jobName: jobName, execution: execution });
            },

            // Jobs
            'reloadJobs': function () {
                console.log('Received request to reload jobs lists');

                $rootScope.$broadcast('reloadJobRequestedEvent');
            },

            // Order
            'orderUpdateReceived': function (jobName, order) {
                console.log('Received order update for', jobName);

                $rootScope.$broadcast('orderUpdateReceivedEvent', { jobName: jobName, order: order });
            },

            // Positions
            'newPositionReceived': function (jobName, position) {
                console.log('Received position update for', jobName);

                $rootScope.$broadcast('newPositionReceivedEvent', { jobName: jobName, position: position });
            },

            // Status Updates
            'jobStatusUpdateReceived': function (status) {
                //console.log('Received status update for', status.Name);

                $rootScope.$broadcast('jobStatusUpdateReceivedEvent', status);
            },

            'workerStatusUpdateReceived': function (status) {
                //console.log('Received status update for', status.Name);

                $rootScope.$broadcast('workerStatusUpdateReceivedEvent', status);
            },

            // Workers
            'workerUpdateReceived': function (worker) {
                console.log('Received worker update for', worker.Name);

                $rootScope.$broadcast('workerUpdateReceivedEvent', worker);
            }
        },

        methods: [
        ],

        errorHandler: function (error) {
            console.error(error);
        },

        logging: false,
        useSharedConnection: false
    });

    hub.promise.done(function () {
        console.log('controllerAppHub is now ready');

        ready = true;
    });

    return {
        isReady: function () {
            return ready;
        }
    };

}]);
