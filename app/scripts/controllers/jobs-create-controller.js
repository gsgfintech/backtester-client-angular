'use strict';

angular.module('backtesterclientApp')
.controller('JobsCreateCtrl', ['$uibModalInstance', 'CommonsService', 'JobsService', 'existingStrategyDetails', function ($uibModalInstance, CommonsService, JobsService, existingStrategyDetails) {

    var self = this;

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

    // Time boundaries
    if (existingStrategyDetails) {
        self.lowerBoundDate = existingStrategyDetails.beginDate;
        self.upperBoundDate = existingStrategyDetails.endDate;
        self.lowerBoundTime = existingStrategyDetails.beginTime;
        self.upperBoundTime = existingStrategyDetails.endTime;
    } else {
        self.lowerBoundDate = new Date();
        self.lowerBoundDate.setDate(self.lowerBoundDate.getDate() - 1);

        self.upperBoundDate = new Date();

        self.lowerBoundTime = new Date();
        self.lowerBoundTime.setHours(5);
        self.lowerBoundTime.setMinutes(30);

        self.upperBoundTime = new Date();
        self.upperBoundTime.setHours(4);
        self.upperBoundTime.setMinutes(30);
    }

    self.lowerBoundTime.setSeconds(0);
    self.lowerBoundTime.setMilliseconds(0);
    self.upperBoundTime.setSeconds(0);
    self.upperBoundTime.setMilliseconds(0);

    self.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(2016, 0, 1),
        maxDate: new Date(),
        startingDay: 1
    };

    self.lowerBoundDateOpen = false;
    self.upperBoundDateOpen = false;

    self.backtestJobSettings = {};

    if (existingStrategyDetails) {
        self.fileToUpload = {
            name: existingStrategyDetails.DllPath
        };

        self.fileUploadResult = {
            Crosses: existingStrategyDetails.Crosses,
            NewFileName: existingStrategyDetails.DllPath,
            StrategyName: existingStrategyDetails.Name,
            StrategyVersion: existingStrategyDetails.Version,
            StrategyClass: existingStrategyDetails.TypeName,
            Success: true
        };

        self.canUpload = false;
    }

    self.upload = function (file, errFiles) {
        self.canUpload = false;
        self.fileToUpload = file;

        self.error = errFiles && errFiles[0];

        JobsService.uploadStratDllFile(file, function (progress) {
            file.progress = progress;
        }, function (success) {
            self.fileUploadResult = success;
        }, function (error) {
            self.errorMsg = error;
        });
    };

    self.resetFile = function () {
        self.fileToUpload = null;
        self.fileUploadResult = null;
        self.canUpload = true;
    };

    function mapValue(type, value) {
        if (type === 'Int32' || type === 'Double') {
            return Number(value);
        } else {
            return value;
        }
    }

    self.submitStep1 = function () {
        self.backtestJobSettings.OriginalFileName = self.fileToUpload.name;
        self.backtestJobSettings.NewFileName = self.fileUploadResult.NewFileName;

        if (existingStrategyDetails) {
            self.backtestJobSettings.Parameters = existingStrategyDetails.Parameters.map(function (param) {
                return {
                    Name: param.Name,
                    Tooltip: param.Tooltip,
                    Type: param.Type,
                    Value: mapValue(param.Type, param.Value)
                };
            });
        } else {
            self.backtestJobSettings.Parameters = self.fileUploadResult.Parameters.map(function (param) {
                return {
                    Name: param.Name,
                    Tooltip: param.Tooltip,
                    Type: param.Type,
                    Value: param.DefaultValue
                };
            });
        }

        self.backtestJobSettings.StrategyName = self.fileUploadResult.StrategyName;
        self.backtestJobSettings.StrategyVersion = self.fileUploadResult.StrategyVersion;
        self.backtestJobSettings.StrategyClass = self.fileUploadResult.StrategyClass;
        self.backtestJobSettings.Crosses = self.fileUploadResult.Crosses;

        self.currentStep = 2;
        self.stepPanelsClasses[0] = 'panel-success';
    };

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

    self.submitStep3 = function () {
        self.backtestJobSettings.StartDate = self.lowerBoundDate;
        self.backtestJobSettings.EndDate = self.upperBoundDate;

        self.backtestJobSettings.StartTime = self.lowerBoundTime;
        self.backtestJobSettings.EndTime = self.upperBoundTime;

        self.currentStep = 4;
        self.stepPanelsClasses[2] = 'panel-success';
    };

    self.goBackToStep3 = function () {
        self.currentStep = 3;
        self.stepPanelsClasses[2] = 'panel-default';
    };

    self.submitStep4 = function () {
        self.currentStep = 5;
        self.stepPanelsClasses[3] = 'panel-success';
    };

    self.goBackToStep4 = function () {
        self.currentStep = 4;
        self.stepPanelsClasses[3] = 'panel-default';
    };

    self.submit = function () {
        $uibModalInstance.close(self.backtestJobSettings);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
