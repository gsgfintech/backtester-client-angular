'use strict';

angular.module('backtesterclientApp')
.factory('BacktesterWorkersActionService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/workers/:name/:action';

    return $resource(address, {
        name: '@Name',
        action: '@Action'
    });
}])
.factory('BacktesterWorkersService', ['$rootScope', '$uibModal', 'BacktesterClientHubService', 'BacktesterWorkersActionService', 'PopupService', 'SystemsConfigsService', function ($rootScope, $uibModal, BacktesterClientHubService, BacktesterWorkersActionService, PopupService, SystemsConfigsService) {

    var workers = [];

    function loadBacktesterWorkers() {
        SystemsConfigsService.query(function (systems) {
            if (systems) {
                workers.splice(0, workers.length);

                for (var i = 0; i < systems.length; i++) {
                    if (systems[i].SystemType === 'BacktesterWorker') {
                        workers.push({
                            name: systems[i].Name,
                            config: systems[i],
                            status: {
                                IsAlive: false,
                                OverallStatusLevel: 'RED'
                            }
                        });
                    }
                }
            }
        });
    }

    function addWorkerConfig() {
        console.log('Add new backtester worker');

        var modalInstance = $uibModal.open({
            templateUrl: 'views/backtester-workers-add.html',
            controller: 'BacktesterWorkersAddCtrl as backtesterWorkersAddCtrl',
        });

        modalInstance.result.then(function (newWorker) {
            newWorker.$save(function (result) {
                console.log(result.status);

                loadBacktesterWorkers();
            });
        });
    }

    function deleteWorkerConfig(config) {
        console.log('Delete worker', config.Name);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/backtester-workers-delete.html',
            controller: 'BacktesterWorkersDeleteCtrl as backtesterWorkersDeleteCtrl',
            resolve: {
                worker: function () {
                    return config;
                }
            }
        });

        modalInstance.result.then(function (configToDelete) {
            configToDelete.$delete(function (result) {
                console.log(result.status);
                PopupService.showSuccess('Deleted worker ' + config.Name);

                loadBacktesterWorkers();
            });
        });
    }

    function editWorkerConfig(worker) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/backtester-workers-edit.html',
            controller: 'BacktesterWorkersEditCtrl',
            controllerAs: 'backtesterWorkersEditCtrl',
            size: 'lg',
            resolve: {
                worker: function () {
                    return angular.copy(worker);
                }
            }
        });

        modalInstance.result.then(function (updatedWorker) {
            updatedWorker.$update(function (updated) {
                console.log(updated.status);
                PopupService.showSuccess('Updated worker ' + worker.Name);

                loadBacktesterWorkers();
            });
        });
    }

    function startWorker(name) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Start Backtester Worker';
                },
                action: function () {
                    return 'start backtester worker ' + name;
                },
                objToPass: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('Requesting to start backtester worker', name);

            BacktesterWorkersActionService.get({
                name: name,
                action: 'start'
            }, function (result) {
                if (result.Success) {
                    var successMsg = 'Successfully started backtester worker ' + name;
                    console.log(successMsg);
                    PopupService.showSuccess('Start Worker', successMsg);
                } else {
                    var errMsg = 'Failed to start backtester worker ' + name + ': ' + result.Message;
                    console.error(errMsg);
                    PopupService.showError('Start Worker', errMsg);
                }
            });
        });
    }

    function stopWorker(name) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Stop Backtester Worker';
                },
                action: function () {
                    return 'stop backtester worker ' + name;
                },
                objToPass: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('Requesting to stop backtester worker', name);

            BacktesterWorkersActionService.get({
                name: name,
                action: 'stop'
            }, function (result) {
                if (result.Success) {
                    var successMsg = 'Successfully stopped backtester worker ' + name;
                    console.log(successMsg);
                    PopupService.showSuccess('Stop Worker', successMsg);
                } else {
                    var errMsg = 'Failed to stop backtester worker ' + name + ': ' + result.Message;
                    console.error(errMsg);
                    PopupService.showError('Stop Worker', errMsg);
                }
            });
        });
    }

    function workerAcceptJobs(name) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Accept Jobs';
                },
                action: function () {
                    return 'command worker ' + name + ' to accept jobs';
                },
                objToPass: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('Requesting to start backtest job on worker', name);

            BacktesterWorkersActionService.get({
                name: name,
                action: 'accept-new-jobs'
            }, function (result) {
                if (result.Success) {
                    var successMsg = 'Successfully commanded worker ' + name + ' to accept jobs';
                    console.log(successMsg);
                    PopupService.showSuccess('Accept Jobs', successMsg);
                } else {
                    var errMsg = 'Failed to command worker ' + name + ' to accept jobs: ' + result.Message;
                    console.error(errMsg);
                    PopupService.showError('Accept Jobs', errMsg);
                }
            });
        });
    }

    function workerRejectJobs(name) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Reject Jobs';
                },
                action: function () {
                    return 'command worker ' + name + ' to reject jobs';
                },
                objToPass: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('Requesting worker', name, 'to reject jobs');

            BacktesterWorkersActionService.get({
                name: name,
                action: 'reject-new-jobs'
            }, function (result) {
                if (result.Success) {
                    var successMsg = 'Successfully commanded worker ' + name + ' to reject jobs';
                    console.log(successMsg);
                    PopupService.showSuccess('Reject Jobs', successMsg);
                } else {
                    var errMsg = 'Failed to command worker ' + name + ' to reject jobs: ' + result.Message;
                    console.error(errMsg);
                    PopupService.showError('Reject Jobs', errMsg);
                }
            });
        });
    }

    function showStatusDetails(name) {
        var index = findWorkerIndexByName(name);

        if (index > -1) {
            $uibModal.open({
                templateUrl: 'views/system-status-details.html',
                controller: 'SystemStatusDetailsCtrl as systemStatusDetailsCtrl',
                size: 'lg',
                resolve: {
                    system: function () {
                        return workers[index].status;
                    }
                }
            });
        } else {
            console.error('Unknown worker', name);
        }
    }

    function findWorkerIndexByName(name) {
        for (var i = 0; i < workers.length; i++) {
            if (workers[i].name === name) {
                return i;
            }
        }

        return -1;
    }

    function findAttributeIndex(worker, attributeName) {
        if (worker.status && worker.status.Attributes && worker.status.Attributes.length > 0) {
            for (var i = 0; i < worker.status.Attributes.length; i++) {
                if (worker.status.Attributes[i].Name === attributeName) {
                    return i;
                }
            }
        }

        return -1;
    }

    function getAttributeValue(workerName, attributeName) {
        var workerIndex = findWorkerIndexByName(workerName);

        if (workerIndex > -1) {
            var attributeIndex = findAttributeIndex(workers[workerIndex], attributeName);

            if (attributeIndex > -1) {
                return workers[workerIndex].status.Attributes[attributeIndex].Value;
            } else {
                return null;
            }
        } else {
            console.error('Unknown worker', workerName);
            return null;
        }
    }

    loadBacktesterWorkers();

    // Event listeners
    $rootScope.$on('workerStatusUpdateReceivedEvent', function (event, status) {
        var index = findWorkerIndexByName(status.Name);

        if (index > -1) {
            workers[index].status = status;
        } else {
            console.error('Ignoring status update of unknown worker', status.Name);
        }

        $rootScope.$apply();
    });

    // Force initialization of the hub
    BacktesterClientHubService.isReady();

    return {
        addWorkerConfig: addWorkerConfig,
        deleteWorkerConfig: deleteWorkerConfig,
        editWorkerConfig: editWorkerConfig,
        getAttributeValue: getAttributeValue,
        showStatusDetails: showStatusDetails,
        startWorker: startWorker,
        stopWorker: stopWorker,
        workerAcceptJobs: workerAcceptJobs,
        workerRejectJobs: workerRejectJobs,
        workers: function () {
            return workers;
        }
    };
}]);
