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
    }

    function handleDbActionResult(result) {
        CommonsService.handleDbActionResult(result, loadJobs);
    }

    function getJobByName(jobName, cb) {
        // 1. Look in active jobs
        var job = findJob(activeJobs, jobName);

        if (job) {
            cb(job);
        }

        // 2. Look in inactive jobs
        job = findJob(inactiveJobs, jobName);

        if (job) {
            cb(job);
        }

        // 3. Finally try to get it from the database
        JobsByNameWebService.get({ jobName: jobName }, function (job) {
            cb(job);
        });
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
        return activeJobs;
    }

    function getInactiveJobs() {
        return inactiveJobs;
    }

    // Event listeners
    $rootScope.$on('reloadJobRequestedEvent', function () {
        loadJobs();
    });

    $rootScope.$on('newAlertReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Alerts.push(data.alert);
            $rootScope.$apply();
        }
    });

    $rootScope.$on('newExecutionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Trades.push(data.execution);
            $rootScope.$apply();
        }
    });

    $rootScope.$on('orderUpdateReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Orders.push(data.order);
            $rootScope.$apply();
        }
    });

    $rootScope.$on('newPositionReceivedEvent', function (event, data) {
        var job = findJob(activeJobs, data.jobName);

        if (job) {
            job.Output.Positions.push(data.position);
            $rootScope.$apply();
        }
    });

    return {
        createJob: createJob,
        deleteJob: deleteJob,
        getActiveJobs: getActiveJobs,
        getInactiveJobs: getInactiveJobs,
        getJobByName: getJobByName,
        loadJobs: loadJobs,
        showJobDetails: showJobDetails,
        uploadStratDllFile: uploadStratDllFile
    };

}]);
