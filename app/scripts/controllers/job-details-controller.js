'use strict';

angular.module('backtesterclientApp')
    .controller('JobDetailsCtrl', ['$rootScope', '$location', '$state', '$stateParams', 'JobsService', 'UnrealizedPnlsService', function ($rootScope, $location, $state, $stateParams, JobsService, UnrealizedPnlsService) {

        var self = this;

        self.job = null;

        self.jobName = $stateParams.jobName;

        self.allTrades = [];
        self.allUnrealizedPnlSeries = [];

        var tabs = ['info', 'trades', 'unrpnls'];
        var subTabs = ['status', 'alerts', 'orders', 'trades', 'positions'];

        function findActiveTabIndex() {
            var activeTab = $stateParams.activeTab || 'info';

            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i] === activeTab) {
                    self.activeTabIndex = i;
                }
            }
        }

        self.updateActiveSubTab = function (activeSubTab) {
            for (var i = 0; i < tabs.length; i++) {
                if (subTabs[i] === activeSubTab) {
                    self.activeSubTabIndex = i;
                }
            }
        };

        function setJob(cb) {
            JobsService.getJobByName(self.jobName, function (job) {
                self.job = job;

                if (job && job.Output) {
                    tabs = ['info', 'trades', 'unrpnls'].concat(job.Output.map(function (output) {
                        return output.Day;
                    }));

                    self.allTrades = [];

                    for (var i = 0; i < job.Output.length; i++) {
                        for (var j = 0; j < job.Output[i].Trades.length; j++) {
                            self.allTrades.push(job.Output[i].Trades[j]);
                        }
                    }
                }

                if (job) {
                    UnrealizedPnlsService.getUnrealizedPnls(self.jobName, function (err) {
                        console.error(err);
                    }, function (pnls) {
                        $rootScope.$broadcast('jobUnrealizedPnlsChart.refresh', { jobName: self.jobName, pnlSeries: pnls });
                    });
                }

                findActiveTabIndex();

                if (cb) {
                    cb();
                }
            });
        }

        self.activeTabIndex = 0;
        self.activeSubTabIndex = 0;

        self.updateLocation = function (location) {
            $location.path('/jobs/' + self.jobName + '/' + location);
            $state.go('job-details', { jobName: self.jobName, activeTab: location });
        };

        self.activeJobs = JobsService.getActiveJobs();
        self.inactiveJobs = JobsService.getInactiveJobs();

        if (self.jobName) {
            setJob();
        }

        // Event handlers
        $rootScope.$on('jobsService.jobUpdatedEvent', function (event, data) {
            if (data.jobName === self.jobName || data.jobName === 'all') {
                setJob(function () {
                    $rootScope.$broadcast('jobPositionsChart.refresh', { jobName: data.jobName });
                });
            }
        });

    }])
    .controller('JobDetailsPopupCtrl', ['$uibModalInstance', 'job', function ($uibModalInstance, job) {

        var self = this;

        self.job = job;

        self.detailsLink = '#/jobs/' + job.Name + '/info';

        self.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);
