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
                for (var j = 0; j < $scope.backtestJobPositions[i].PositionSecurities.length; j++) {
                    if ($scope.positionsByCross[$scope.backtestJobPositions[i].PositionSecurities[j].Cross]) {
                        $scope.positionsByCross[$scope.backtestJobPositions[i].PositionSecurities[j].Cross].push({
                            quantity: $scope.backtestJobPositions[i].PositionSecurities[j].PositionQuantity,
                            cumulativePnl: $scope.backtestJobPositions[i].PositionSecurities[j].RealizedPnlUsd,
                            timestamp: $scope.backtestJobPositions[i].Timestamp
                        });
                    } else {
                        $scope.positionsByCross[$scope.backtestJobPositions[i].PositionSecurities[j].Cross] = [{
                            quantity: $scope.backtestJobPositions[i].PositionSecurities[j].PositionQuantity,
                            cumulativePnl: $scope.backtestJobPositions[i].PositionSecurities[j].RealizedPnlUsd,
                            timestamp: $scope.backtestJobPositions[i].Timestamp
                        }];
                    }
                }
            }

            function calculatePosChartData() {

            }
        }]
    };
}]);
