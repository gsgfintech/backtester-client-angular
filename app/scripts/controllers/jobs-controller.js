'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['$timeout', 'JobsService', 'JobsStatusService', 'serverEndpoint', 'Upload', function ($timeout, JobsService, JobsStatusService, serverEndpoint, Upload) {

    var self = this;

    var address = serverEndpoint + 'api/strats/file';

    self.currentStep = 1;
    self.stepPanelsClasses = [
        'panel-default',
        'panel-default',
        'panel-default',
        'panel-default'
    ];

    self.canUpload = true;
    self.uploading = false;
    self.fileToUpload = null;
    self.error = null;
    self.errorMsg = null;

    self.fileUploadResult = null;

    self.lowerBoundDate = new Date();
    self.upperBoundDate = new Date();
    self.lowerBoundTime = new Date();
    self.upperBoundTime = new Date();

    self.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(2016, 0, 1),
        maxDate: new Date(),
        startingDay: 1
    };

    self.lowerBoundDateOpen = false;
    self.upperBoundDateOpen = false;

    self.backtestJobSettings = {};

    self.upload = function (file, errFiles) {
        self.canUpload = false;
        self.fileToUpload = file;

        self.error = errFiles && errFiles[0];

        if (file) {
            file.upload = Upload.upload({
                url: address,
                data: { file: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;

                    self.fileUploadResult = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    self.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

    self.resetFile = function () {
        self.fileToUpload = null;
        self.fileUploadResult = null;
        self.canUpload = true;
    };

    self.submitStep1 = function () {
        self.backtestJobSettings.FileName = self.fileToUpload.name;
        self.backtestJobSettings.Parameters = angular.copy(self.fileUploadResult.Parameters);
        self.backtestJobSettings.StrategyName = self.fileUploadResult.StrategyName;
        self.backtestJobSettings.StrategyVersion = self.fileUploadResult.StrategyVersion;
        self.backtestJobSettings.Crosses = self.fileUploadResult.Crosses;

        self.currentStep = 2;
        self.stepPanelsClasses[0] = 'panel-success';
    }

    self.goBackToStep1 = function () {
        self.backtestJobSettings = {};

        self.currentStep = 1;
        self.stepPanelsClasses[0] = 'panel-default';
    };

    self.submitStep2 = function () {
        self.currentStep = 3;
        self.stepPanelsClasses[1] = 'panel-success';
    };

    self.goBackToStep2 = function () {
        self.lowerBoundDate = new Date();
        self.upperBoundDate = new Date();
        self.lowerBoundTime = new Date();
        self.upperBoundTime = new Date();

        self.currentStep = 2;
        self.stepPanelsClasses[1] = 'panel-default';
    };

    self.openDatePicker = function (bound) {
        if (bound === 'lowerDate') {
            self.lowerBoundDateOpen = true;
        } else if (bound === 'upperDate') {
            self.upperBoundDateOpen = true;
        }
    };

    function computeStartAndEnd() {
        self.backtestJobSettings.Start = new Date(self.lowerBoundDate.getFullYear(), self.lowerBoundDate.getMonth(), self.lowerBoundDate.getDate(), self.lowerBoundTime.getHours(), self.lowerBoundTime.getMinutes()).toISOString();
        self.backtestJobSettings.End = new Date(self.upperBoundDate.getFullYear(), self.upperBoundDate.getMonth(), self.upperBoundDate.getDate(), self.upperBoundTime.getHours(), self.upperBoundTime.getMinutes()).toISOString();
    }

    self.submitStep3 = function () {
        computeStartAndEnd();

        self.currentStep = 4;
        self.stepPanelsClasses[2] = 'panel-success';
    };

    self.goBackToStep3 = function () {
        self.currentStep = 3;
        self.stepPanelsClasses[2] = 'panel-default';
    };

    self.submitStep4 = function () {
        self.resetFile();
        self.backtestJobSettings = {};

        self.currentStep = 1;

        for (var i = 0; i < self.stepPanelsClasses.length; i++) {
            self.stepPanelsClasses[i] = 'panel-default';
        }
    };

}]);
