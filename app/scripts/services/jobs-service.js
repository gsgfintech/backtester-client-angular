'use strict';

angular.module('backtesterclientApp')
.factory('JobsByNameWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/name/:jobName';

    return $resource(address, {
        jobName: '@JobName'
    });
}])
.factory('JobsByStatusWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/status/:status';

    return $resource(address, {
        status: '@Status'
    });
}])
.factory('JobsService', ['$rootScope', '$uibModal', 'CommonsService', 'JobsByNameWebService', 'JobsByStatusWebService', 'serverEndpoint', 'Upload', function ($rootScope, $uibModal, CommonsService, JobsByNameWebService, JobsByStatusWebService, serverEndpoint, Upload) {

    var jobsLoaded = false;

    var activeJobs = [];
    var inactiveJobs = [];

    function findJob(array, jobName) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].Name === jobName) {
                return array[i];
            }
        }

        return null;
    }

    function populateJobs(jobsReceived, jobsToPopulate) {
        jobsToPopulate.splice(0, jobsToPopulate.length);

        for (var i = 0; i < jobsReceived.length; i++) {
            jobsToPopulate.push(jobsReceived[i]);
        }
    }

    function loadJobs() {
        JobsByStatusWebService.query({ status: 'active' }, function (newActiveJobs) {
            populateJobs(newActiveJobs, activeJobs);

            JobsByStatusWebService.query({ status: 'inactive' }, function (newInactiveJobs) {
                populateJobs(newInactiveJobs, inactiveJobs);
            });
        });

        jobsLoaded = true;
    }

    function handleDbActionResult(result) {
        CommonsService.handleDbActionResult(result, loadJobs);
    }

    function getJobByName(jobName, cb) {
        // 1. Look in active jobs
        var job = findJob(activeJobs, jobName);

        // 2. Look in inactive jobs
        if (!job) {
            job = findJob(inactiveJobs, jobName);
        }

        if (job) {
            cb(job);
        } else {
            // 3. Finally try to get it from the database
            JobsByNameWebService.get({ jobName: jobName }, function (job) {
                cb(job);
            });
        }
    }

    function showJobDetails(jobName) {
        getJobByName(jobName, function (job) {
            $uibModal.open({
                templateUrl: 'views/job-details-popup.html',
                controller: 'JobDetailsPopupCtrl',
                controllerAs: 'jobDetailsCtrl',
                size: 'lg',
                resolve: {
                    job: function () {
                        return job;
                    }
                }
            });
        });
    }

    function getTrade(jobName, tradeId, cb) {
        getJobByName(jobName, function (job) {
            var trade = null;

            if (job) {
                for (var i = 0; i < job.Output.Trades.length; i++) {
                    if (job.Output.Trades[i].TradeId === tradeId) {
                        trade = job.Output.Trades[i];
                    }
                }
            }

            cb(trade);
        });
    }

    function showTradeDetails(jobName, tradeId) {
        getTrade(jobName, tradeId, function (trade) {
            $uibModal.open({
                templateUrl: 'views/trade-details-popup.html',
                controller: 'TradeDetailsPopupCtrl',
                controllerAs: 'tradeDetailsCtrl',
                resolve: {
                    jobName: function () {
                        return jobName;
                    },
                    trade: function () {
                        return trade;
                    }
                }
            });
        });
    }

    function getOrder(jobName, orderId, cb) {
        getJobByName(jobName, function (job) {
            var order = null;

            if (job) {
                for (var i = 0; i < job.Output.Orders.length; i++) {
                    if (job.Output.Orders[i].OrderId === orderId) {
                        order = job.Output.Orders[i];
                    }
                }
            }

            cb(order);
        });
    }

    function showOrderDetails(jobName, orderId) {
        getOrder(jobName, orderId, function (order) {
            $uibModal.open({
                templateUrl: 'views/order-details-popup.html',
                controller: 'OrderDetailsPopupCtrl',
                controllerAs: 'orderDetailsCtrl',
                resolve: {
                    jobName: function () {
                        return jobName;
                    },
                    order: function () {
                        return order;
                    }
                }
            });
        });
    }

    function getAlert(jobName, alertId, cb) {
        getJobByName(jobName, function (job) {
            var alert = null;

            if (job) {
                for (var i = 0; i < job.Output.Alerts.length; i++) {
                    if (job.Output.Alerts[i].AlertId === alertId) {
                        alert = job.Output.Alerts[i];
                    }
                }
            }

            cb(alert);
        });
    }

    function showAlertDetails(jobName, alertId) {
        getAlert(jobName, alertId, function (alert) {
            $uibModal.open({
                templateUrl: 'views/alert-details-popup.html',
                controller: 'AlertDetailsPopupCtrl',
                controllerAs: 'alertDetailsCtrl',
                resolve: {
                    jobName: function () {
                        return jobName;
                    },
                    alert: function () {
                        return alert;
                    }
                }
            });
        });
    }

    function uploadStratDllFile(file, progressCb, successCb, errorCb) {
        if (file) {
            var address = serverEndpoint + 'api/strats/file';

            file.upload = Upload.upload({
                url: address,
                data: { file: file }
            });

            file.upload.then(function (response) {
                successCb(response.data);
            }, function (response) {
                errorCb(response.data);
            }, function (evt) {
                progressCb(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)));
            });
        } else {
            errorCb('Invalid file');
        }
    }

    function createJob() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/jobs-create-popup.html',
            controller: 'JobsCreateCtrl',
            controllerAs: 'jobsCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function (newJobSettings) {
            JobsByNameWebService.save(newJobSettings, handleDbActionResult);
        });
    }

    function deleteJob(jobName) {
        console.log('Delete job', jobName);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/action-confirm-popup.html',
            controller: 'ActionConfirmPopupCtrl',
            controllerAs: 'actionConfirmPopupCtrl',
            resolve: {
                title: function () {
                    return 'Delete Backtest Job';
                },
                action: function () {
                    return 'delete backtest job ' + jobName;
                },
                objToPass: function () {
                    return jobName;
                }
            }
        });

        modalInstance.result.then(function (jobNameToDelete) {
            JobsByNameWebService.delete({ jobName: jobNameToDelete }, handleDbActionResult);
        });
    }

    function getActiveJobs() {
        if (!jobsLoaded) {
            loadJobs();
        }

        return activeJobs;
    }

    function getInactiveJobs() {
        if (!jobsLoaded) {
            loadJobs();
        }

        return inactiveJobs;
    }

    // Event listeners
    $rootScope.$on('reloadJobRequestedEvent', function () {
        loadJobs();
        $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: 'all' });
    });

    $rootScope.$on('newAlertReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Alerts.push(data.alert);
            $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
        }
    });

    $rootScope.$on('newExecutionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Trades.push(data.execution);
            $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
        }
    });

    $rootScope.$on('orderUpdateReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Orders.push(data.order);
            $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
        }
    });

    $rootScope.$on('newPositionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Positions.push(data.position);
            $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
        }
    });

    return {
        createJob: createJob,
        deleteJob: deleteJob,
        getActiveJobs: getActiveJobs,
        getAlert: getAlert,
        getInactiveJobs: getInactiveJobs,
        getJobByName: getJobByName,
        getOrder: getOrder,
        getTrade: getTrade,
        loadJobs: loadJobs,
        showAlertDetails: showAlertDetails,
        showJobDetails: showJobDetails,
        showOrderDetails: showOrderDetails,
        showTradeDetails: showTradeDetails,
        uploadStratDllFile: uploadStratDllFile
    };

}]);
