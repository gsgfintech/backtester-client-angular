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
.factory('JobsService', ['$uibModal', 'JobsByNameWebService', 'JobsByStatusWebService', 'PopupService', 'serverEndpoint', 'Upload', function ($uibModal, JobsByNameWebService, JobsByStatusWebService, PopupService, serverEndpoint, Upload) {

    function notifyError(errMsg, cb) {
        console.error(errMsg);
        PopupService.showError(errMsg);

        if (cb) {
            cb(errMsg);
        }
    }

    function notifySuccess(msg, cb) {
        console.log(msg);
        PopupService.showSuccess(msg);

        if (cb) {
            cb(msg);
        }
    }

    function getJobByName(jobName, successCb, errCb) {
        JobsByNameWebService.get({ jobName: jobName }, function (job) {
            successCb(job);
        }, function (err) {
            errCb(err);
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
        }, function (err) {
            console.error(err);
        });
    }

    function getPendingJobs() {
        return JobsByStatusWebService.query({ status: 'active' });
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

    function createJob(successCb, errorCb) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/jobs-create-popup.html',
            controller: 'JobsCreateCtrl',
            controllerAs: 'jobsCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function (settings) {
            var job = new JobsByNameWebService();

            job.FileName = settings.FileName;
            job.Parameters = settings.Parameters;
            job.StrategyName = settings.StrategyName;
            job.StrategyVersion = settings.StrategyVersion;
            job.Crosses = settings.Crosses;
            job.Start = settings.Start;
            job.End = settings.End;
            job.UseAllDay = settings.UseAllDay;

            job.$save(function (result) {
                if (result.success) {
                    notifySuccess(result.message, successCb);
                } else {
                    notifyError(result.message, errorCb);
                }
            }, function (err) {
                notifyError(err, errorCb);
            });
        });
    }

    function deleteJob(jobName, successCb, errCb) {
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
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('Requesting to delete backtest job', jobName);

            JobsByNameWebService.get({ jobName: jobName }, function (jobToDelete) {
                if (jobToDelete) {
                    jobToDelete.$delete({ jobName: jobName }, function (result) {
                        if (result.success) {
                            notifySuccess(result.message, successCb);
                        } else {
                            notifyError(result.message, errCb);
                        }
                    }, function (err) {
                        notifyError(err, errCb);
                    });
                } else {
                    notifyError('Failed to delete unknown job ' + jobName, errCb);
                }
            });
        });
    }

    return {
        createJob: createJob,
        deleteJob: deleteJob,
        getJobByName: getJobByName,
        getPendingJobs: getPendingJobs,
        showJobDetails: showJobDetails,
        uploadStratDllFile: uploadStratDllFile
    };

}]);
