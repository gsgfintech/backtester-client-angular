'use strict';

angular.module('backtesterclientApp')
.factory('BacktesterClientHubService', ['$rootScope', 'Hub', 'PopupService', 'serverEndpoint', function ($rootScope, Hub, PopupService, serverEndpoint) {

    var ready = false;

    var hub = new Hub('controllerAppHub', {
        rootPath: serverEndpoint + '/signalr',
        listeners: {

            // Alerts
            'alertsClosed': function (alertIds) {
                console.log('Several alerts were closed');

                $rootScope.$broadcast('alertsClosedEvent', alertIds);
            },
            'newAlertReceived': function (alert) {
                // Show popup
                if (alert.Level === 'INFO') {
                    PopupService.showNote('[INFO] ' + alert.Source, alert.Subject);
                } else if (alert.Level === 'WARNING') {
                    PopupService.showWarning('[WARNING] ' + alert.Source, alert.Subject);
                } else {
                    PopupService.showError('[ERROR] ' + alert.Source, alert.Subject);
                }

                $rootScope.$broadcast('newAlertReceivedEvent', alert);
            },

            // Executions
            'newExecutionReceived': function (execution) {
                var message = execution.Side + ' ' + execution.Quantity + ' ' + execution.Cross + ' @ ' + execution.Price;

                console.log('Received new execution:', message, '-', execution.ExecutionId);

                // Show popup
                PopupService.showSuccess('[TRADE]', message);

                $rootScope.$broadcast('newExecutionReceivedEvent', execution);
            },

            // Jobs
            'reloadJobs': function () {
                console.log('Received request to reload jobs lists');

                $rootScope.$broadcast('reloadJobRequestedEvent');
            },

            // Order
            'orderUpdateReceived': function (order) {
                console.log('Received order update for ', order.OrderID);

                $rootScope.$broadcast('orderUpdateReceivedEvent', order);
            },

            // Positions
            'newPositionReceived': function (position) {
                console.log('Received position update');

                $rootScope.$broadcast('newPositionReceivedEvent', position);
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
