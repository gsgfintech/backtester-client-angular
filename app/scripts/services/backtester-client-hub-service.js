'use strict';

angular.module('backtesterclientApp')
.factory('BacktesterClientHubService', ['$rootScope', 'Hub', 'serverEndpoint', function ($rootScope, Hub, serverEndpoint) {

    var ready = false;

    var hub = new Hub('controllerAppHub', {
        rootPath: serverEndpoint + '/signalr',
        listeners: {

            // Alerts
            'newAlertReceived': function (jobName, day, alert) {
                console.log('Received alert update for', jobName, day);

                $rootScope.$broadcast('newAlertReceivedEvent', { jobName: jobName, day: day, alert: alert });
            },

            // Backtest Status
            'newBacktestStatusReceived': function (jobName, day, status) {
                console.log('Received backtest status update for', jobName, day);

                $rootScope.$broadcast('newBacktestStatusReceivedEvent', { jobName: jobName, day: day, status: status });
            },

            // Executions
            'newExecutionReceived': function (jobName, day, execution) {
                console.log('Received trade update for', jobName, day);

                $rootScope.$broadcast('newExecutionReceivedEvent', { jobName: jobName, day: day, execution: execution });
            },

            // Jobs
            'reloadJobs': function () {
                console.log('Received request to reload jobs lists');

                $rootScope.$broadcast('reloadJobRequestedEvent');
            },

            // Order
            'orderUpdateReceived': function (jobName, day, order) {
                console.log('Received order update for', jobName, day);

                $rootScope.$broadcast('orderUpdateReceivedEvent', { jobName: jobName, day: day, order: order });
            },

            // Positions
            'newPositionReceived': function (jobName, day, position) {
                console.log('Received position update for', jobName, day);

                $rootScope.$broadcast('newPositionReceivedEvent', { jobName: jobName, day: day, position: position });
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
