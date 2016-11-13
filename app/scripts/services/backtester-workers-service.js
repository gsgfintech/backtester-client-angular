'use strict';

angular.module('backtesterclientApp')
.factory('BacktesterWorkersWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/workers/:name';

    return $resource(address, { name: '@Name' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    });
}]).factory('BacktesterWorkersActionService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/workers/:name/:action';

    return $resource(address, {
        name: '@Name',
        action: '@Action'
    });
}])
.factory('BacktesterWorkersService', ['$rootScope', '$uibModal', 'BacktesterClientHubService', 'BacktesterWorkersWebService', 'BacktesterWorkersActionService', 'CommonsService', function ($rootScope, $uibModal, BacktesterClientHubService, BacktesterWorkersWebService, BacktesterWorkersActionService, CommonsService) {

    var workers = [];

    function findWorkerIndexByName(name) {
        for (var i = 0; i < workers.length; i++) {
            if (workers[i].Name === name) {
                return i;
            }
        }

        return -1;
    }

    function getWorkerByName(name, successCb, errCb) {
        var index = findWorkerIndexByName(name);

        if (index > -1) {
            successCb(workers[index]);
        } else {
            console.log('Worker', name, 'was not found in the list. Will try to load it from the database');

            BacktesterWorkersWebService.get({ name: name }, function (worker) {
                if (worker) {
                    workers.push(worker);
                    successCb(worker);
                } else {
                    errCb('Failed to load worker ' + name);
                }
            });
        }
    }

    function loadBacktesterWorkers() {
        workers.splice(0, workers.length);

        BacktesterWorkersWebService.query(function (dbWorkers) {
            for (var i = 0; i < dbWorkers.length; i++) {
                workers.push(dbWorkers[i]);
            }
        });
    }

    function handleDbActionResult(result) {
        CommonsService.handleDbActionResult(result, loadBacktesterWorkers);
    }

    function handleDbActionResultNoCb(result) {
        CommonsService.handleDbActionResult(result);
    }

    function addWorkerConfig() {
        console.log('Add new backtester worker');

        var modalInstance = $uibModal.open({
            templateUrl: 'views/backtester-workers-add.html',
            controller: 'BacktesterWorkersAddCtrl as backtesterWorkersAddCtrl',
        });

        modalInstance.result.then(function (newWorker) {
            BacktesterWorkersWebService.save(newWorker, handleDbActionResult);
        });
    }

    function deleteWorker(name) {
        console.log('Delete worker', name);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Delete Backtester Worker';
                },
                action: function () {
                    return 'delete backtester worker ' + name;
                },
                objToPass: function () {
                    return name;
                }
            }
        });

        modalInstance.result.then(function (workerNameToDelete) {
            BacktesterWorkersWebService.delete({ name: workerNameToDelete }, handleDbActionResult);
        });
    }

    function editWorkerConfig(workerName) {
        getWorkerByName(workerName, function (worker) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/backtester-workers-edit.html',
                controller: 'BacktesterWorkersEditCtrl',
                controllerAs: 'backtesterWorkersEditCtrl',
                resolve: {
                    worker: function () {
                        return worker;
                    }
                }
            });

            modalInstance.result.then(function (updated) {
                BacktesterWorkersWebService.update({ name: updated.Name }, updated, handleDbActionResult);
            });
        }, function (err) {
            console.error(err);
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
            }, handleDbActionResultNoCb);
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
            }, handleDbActionResultNoCb);
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
            }, handleDbActionResultNoCb);
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
            }, handleDbActionResultNoCb);
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

    function showWorkerDetails(workerName) {
        getWorkerByName(workerName, function (worker) {
            $uibModal.open({
                templateUrl: 'views/worker-details-popup.html',
                controller: 'BacktesterWorkerDetailsPopupCtrl',
                controllerAs: 'workerDetailsCtrl',
                size: 'lg',
                resolve: {
                    worker: function () {
                        return worker;
                    }
                }
            });
        }, function (err) {
            console.error(err);
        });
    }

    loadBacktesterWorkers();

    // Event listeners
    $rootScope.$on('workerUpdateReceivedEvent', function (event, worker) {
        var index = findWorkerIndexByName(worker.Name);

        if (index > -1) {
            workers[index] = worker;
        } else {
            workers.push(worker);
        }

        $rootScope.$apply();
    });

    // Event listeners
    $rootScope.$on('workerStatusUpdateReceivedEvent', function (event, status) {
        var index = findWorkerIndexByName(status.Name);

        if (index > -1) {
            if (status.Attributes) {
                for (var i = 0; i < status.Attributes.length; i++) {
                    if (status.Attributes[i].Name === 'IsAcceptingJobs') {
                        status.isAcceptingJobs = (status.Attributes[i].Value.toLowerCase() === 'true');
                    }
                }
            }


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
        deleteWorker: deleteWorker,
        editWorkerConfig: editWorkerConfig,
        getAttributeValue: getAttributeValue,
        getWorkerByName: getWorkerByName,
        showStatusDetails: showStatusDetails,
        showWorkerDetails: showWorkerDetails,
        startWorker: startWorker,
        stopWorker: stopWorker,
        workerAcceptJobs: workerAcceptJobs,
        workerRejectJobs: workerRejectJobs,
        workers: function () {
            return workers;
        }
    };
}]);
