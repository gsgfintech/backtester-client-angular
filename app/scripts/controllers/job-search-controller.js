'use strict';

angular.module('backtesterclientApp')
.controller('JobSearchCtrl', ['JobsService', 'JobsStratsNamesWebService', 'JobsStratsVersionsWebService', function (JobsService, JobsStratsNamesWebService, JobsStratsVersionsWebService) {

    var self = this;

    self.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(2016, 0, 1),
        maxDate: new Date(),
        startingDay: 1
    };

    self.rangeStartOpen = false;
    self.rangeEndOpen = false;

    self.stratNames = [''];

    self.stratVersions = [''];

    self.searchId = null;
    self.searchStrat = self.stratNames[0];
    self.searchStratVersion = null;

    self.searchRangeStart = null;
    self.searchRangeEnd = null;

    self.results = JobsService.getSearchResults();

    self.search = function () {
        console.log('Searching');

        JobsService.search(self.searchId, self.searchStrat, self.searchStratVersion, self.searchRangeStart, self.searchRangeEnd, function () {
            self.results = JobsService.getSearchResults();
        });
    };

    self.getStratVersions = function () {
        self.searchStratVersion = null;

        if (self.searchStrat) {
            self.stratVersions = [''];

            JobsStratsVersionsWebService.query({ stratName: self.searchStrat }, function (versions) {
                if (versions) {
                    self.searchStratVersion = self.stratVersions[0];
                    self.stratVersions = self.stratVersions.concat(versions);
                }
            });
        }
    };

    self.openDatePicker = function (bound) {
        if (bound === 'start') {
            self.rangeStartOpen = true;
        } else if (bound === 'end') {
            self.rangeEndOpen = true;
        }
    };

    JobsStratsNamesWebService.query(function (strats) {
        if (strats) {
            self.stratNames = self.stratNames.concat(strats);
        }
    });
}]);
