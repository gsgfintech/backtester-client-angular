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
.factory('JobsStratsNamesWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/strats/names';

    return $resource(address, {});
}])
.factory('JobsStratsVersionsWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/strats/versions/:stratName';

    return $resource(address, {
        stratName: '@StratName'
    });
}])
.factory('JobsSearchWebService', ['$resource', 'serverEndpoint', function ($resource, serverEndpoint) {
    var address = serverEndpoint + 'api/jobs/search';

    return $resource(address, {});
}])
.factory('JobsService', ['$rootScope', '$uibModal', 'CommonsService', 'JobsByNameWebService', 'JobsByStatusWebService', 'JobsSearchWebService', 'serverEndpoint', 'Upload', function ($rootScope, $uibModal, CommonsService, JobsByNameWebService, JobsByStatusWebService, JobsSearchWebService, serverEndpoint, Upload) {

    var jobsLoaded = false;

    var activeJobs = [];
    var inactiveJobs = [];
    var searchResults = [];
    var otherUnclassifiedJobs = [];

    function findJob(array, jobName) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].Name === jobName) {
                return array[i];
            }
        }

        return null;
    }

    function findOutputIndexByDay(job, day) {
        for (var i = 0; i < job.Output.length; i++) {
            if (job.Output[i].Day === day) {
                return i;
            }
        }

        return -1;
    }

    function findDayOutput(job, day) {
        for (var i = 0; i < job.Output.length; i++) {
            if (job.Output[i].Day === day) {
                return job.Output[i];
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

        // 3. Look in search results
        if (!job) {
            job = findJob(searchResults, jobName);
        }

        // 4. Look in unclassified jobs
        if (!job) {
            job = findJob(otherUnclassifiedJobs, jobName);
        }

        if (job) {
            cb(job);
        } else {
            // 3. Finally try to get it from the database
            JobsByNameWebService.get({ jobName: jobName }, function (job) {
                otherUnclassifiedJobs.push(job);

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

    function getTrade(jobName, day, tradeId, cb) {
        getJobByName(jobName, function (job) {
            var trade = null;

            if (job) {
                var dayOutput = findDayOutput(job, day);

                if (dayOutput) {
                    for (var i = 0; i < dayOutput.Trades.length; i++) {
                        if (dayOutput.Trades[i].TradeId === tradeId) {
                            trade = dayOutput.Trades[i];
                        }
                    }
                }
            }

            cb(trade);
        });
    }

    function findTradeIndex(output, tradeId) {
        for (var i = 0; i < output.Trades.length; i++) {
            if (output.Trades[i].TradeId === tradeId) {
                return i;
            }
        }

        return -1;
    }

    function showTradeDetails(jobName, day, tradeId) {
        getTrade(jobName, day, tradeId, function (trade) {
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

    function getOrder(jobName, day, orderId, cb) {
        getJobByName(jobName, function (job) {
            var order = null;

            if (job) {
                var dayOutput = findDayOutput(job, day);

                if (dayOutput) {
                    for (var i = 0; i < dayOutput.Orders.length; i++) {
                        if (dayOutput.Orders[i].OrderId === orderId) {
                            order = dayOutput.Orders[i];
                        }
                    }
                }
            }

            cb(order);
        });
    }

    function findOrderIndex(output, orderId) {
        for (var i = 0; i < output.Orders.length; i++) {
            if (output.Orders[i].OrderId === orderId) {
                return i;
            }
        }

        return -1;
    }

    function showOrderDetails(jobName, day, orderId) {
        getOrder(jobName, day, orderId, function (order) {
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

    function getAlert(jobName, day, alertId, cb) {
        getJobByName(jobName, function (job) {
            var alert = null;

            if (job) {
                var dayOutput = findDayOutput(job, day);

                if (dayOutput) {
                    for (var i = 0; i < dayOutput.Alerts.length; i++) {
                        if (dayOutput.Alerts[i].AlertId === alertId) {
                            alert = dayOutput.Alerts[i];
                        }
                    }
                }
            }

            cb(alert);
        });
    }

    function showAlertDetails(jobName, day, alertId) {
        getAlert(jobName, day, alertId, function (alert) {
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

    function createJob(existingStrategyDetails) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/jobs-create-popup.html',
            controller: 'JobsCreateCtrl',
            controllerAs: 'jobsCtrl',
            size: 'lg',
            resolve: {
                existingStrategyDetails: function () {
                    return existingStrategyDetails;
                }
            }
        });

        modalInstance.result.then(function (newJobSettings) {
            JobsByNameWebService.save(newJobSettings, handleDbActionResult);
        });
    }

    function cloneJob(jobName) {
        getJobByName(jobName, function (job) {
            if (job) {
                job.Strategy.beginDate = new Date(job.BeginDate);
                job.Strategy.endDate = new Date(job.EndDate);
                job.Strategy.beginTime = new Date(job.BeginTime);
                job.Strategy.endTime = new Date(job.EndTime);

                createJob(job.Strategy);
            } else {
                console.error('Failed to load details of job ', jobName);
            }
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

    function getSearchResults() {
        return searchResults;
    }

    function search(jobName, stratName, stratVersion, rangeStart, rangeEnd, cb) {
        JobsSearchWebService.save({
            JobName: jobName,
            StratName: stratName,
            StratVersion: stratVersion,
            RangeStart: rangeStart,
            RangeEnd: rangeEnd
        }, function (response) {
            if (response && response.jobs) {
                searchResults = response.jobs;
            }

            if (cb) {
                cb();
            }
        });
    }

    function getUnrealizedPnlSeries(jobName, err, cb) {
        getJobByName(jobName, function (job) {
            if (job) {
                if (cb) {
                    cb(job.UnrealizedPnlSeries);
                }
            } else {
                if (err) {
                    err('Failed to get job ' + jobName);
                }
            }
        });
    }

    // Event listeners
    $rootScope.$on('reloadJobRequestedEvent', function () {
        loadJobs();
        $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: 'all' });
    });

    $rootScope.$on('newAlertReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            var outputIndex = findOutputIndexByDay(job, data.day);

            if (outputIndex > -1) {
                job.Output[outputIndex].Alerts.push(data.alert);
                $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
            }
        }
    });

    $rootScope.$on('newBacktestStatusReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            var outputIndex = findOutputIndexByDay(job, data.day);

            if (outputIndex > -1) {
                job.Output[outputIndex].Status = data.status;
                $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
            }
        }
    });

    $rootScope.$on('newExecutionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            var output = findDayOutput(job, data.day);

            if (output) {
                var tradeIndex = findTradeIndex(output, data.execution.TradeId);

                if (tradeIndex > -1) {
                    output.Trades[tradeIndex] = data.execution;
                } else {
                    output.Trades.push(data.execution);
                }

                $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
            }
        }
    });

    $rootScope.$on('orderUpdateReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            var output = findDayOutput(job, data.day);

            if (output) {
                var orderIndex = findOrderIndex(output, data.order.OrderId);

                if (orderIndex > -1) {
                    output.Orders[orderIndex] = data.order;
                } else {
                    output.Orders.push(data.order);
                }

                $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
            }
        }
    });

    $rootScope.$on('newPositionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            var outputIndex = findOutputIndexByDay(job, data.day);

            if (outputIndex > -1) {
                job.Output[outputIndex].Positions.push(data.position);
                $rootScope.$broadcast('jobsService.jobUpdatedEvent', { jobName: data.jobName });
            }
        }
    });

    return {
        cloneJob: cloneJob,
        createJob: createJob,
        deleteJob: deleteJob,
        getActiveJobs: getActiveJobs,
        getAlert: getAlert,
        getInactiveJobs: getInactiveJobs,
        getSearchResults: getSearchResults,
        getJobByName: getJobByName,
        getOrder: getOrder,
        getTrade: getTrade,
        getUnrealizedPnlSeries: getUnrealizedPnlSeries,
        loadJobs: loadJobs,
        search: search,
        showAlertDetails: showAlertDetails,
        showJobDetails: showJobDetails,
        showOrderDetails: showOrderDetails,
        showTradeDetails: showTradeDetails,
        uploadStratDllFile: uploadStratDllFile
    };

}]);
