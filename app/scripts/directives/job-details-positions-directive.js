'use strict';

angular.module('backtesterclientApp')
.directive('jobPositions', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobDay: '=day',
            backtestJobPositions: '=positions'
        },
        templateUrl: 'views/job-positions-template.html',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.positionsByCross = {};
            $scope.posChartData = [];

            for (var i = 0; i < $scope.backtestJobPositions.length; i++) {
                if ($scope.positionsByCross[$scope.backtestJobPositions[i].Cross]) {
                    $scope.positionsByCross[$scope.backtestJobPositions[i].Cross].push({
                        quantity: $scope.backtestJobPositions[i].PositionQuantity,
                        cumulativePnl: $scope.backtestJobPositions[i].RealizedPnlUsd,
                        timestamp: $scope.backtestJobPositions[i].LastUpdate
                    });
                } else {
                    $scope.positionsByCross[$scope.backtestJobPositions[i].Cross] = [{
                        quantity: $scope.backtestJobPositions[i].PositionQuantity,
                        cumulativePnl: $scope.backtestJobPositions[i].RealizedPnlUsd,
                        timestamp: $scope.backtestJobPositions[i].LastUpdate
                    }];
                }
            }

            function calculatePosChartData() {

            }
        }]
    };
}]);
