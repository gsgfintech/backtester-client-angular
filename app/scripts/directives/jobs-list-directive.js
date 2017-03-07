'use strict';

angular.module('backtesterclientApp')
.directive('jobsList', function () {
    return {
        templateUrl: 'views/jobs-list-template.html',
        restrict: 'E',
        scope: {
            backtestJobs: '=jobs',
            header: '@'
        },
        controller: ['$scope', 'BacktesterWorkersService', 'JobsService', function ($scope, BacktesterWorkersService, JobsService) {
            $scope.showJobDetails = function (jobName) {
                JobsService.showJobDetails(jobName);
            };

            $scope.showWorkerDetails = function (name) {
                BacktesterWorkersService.showWorkerDetails(name);
            };

            $scope.deleteJob = function (jobName) {
                JobsService.deleteJob(jobName);
            };

            $scope.cloneJob = function (jobName) {
                console.log('Cloning '+ jobName);

                JobsService.cloneJob(jobName);
            };
        }]
    };
});
