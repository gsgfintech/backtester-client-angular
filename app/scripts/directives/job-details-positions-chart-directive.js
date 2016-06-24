'use strict';

angular.module('backtesterclientApp')
.directive('jobPositionsChart', [function () {
    return {
        template: '<div></div>',
        restrict: 'A',
        scope: {
            backtestJobName: '=name',
            backtestJobDay: '=day',
            dataProvider: '=data',
            height: '@',
            width: '@'
        },
        link: function (scope, element) {
            function createChart(elemId, data) {
                console.log('Rendering position chart');

                return AmCharts.makeChart(elemId, {
                    type: 'serial',
                    addClassNames: true,
                    balloonDateFormat: 'MMM DD JJ:NN:SS',
                    theme: 'light',
                    autoMargins: false,
                    marginLeft: 30,
                    marginRight: 8,
                    marginTop: 10,
                    marginBottom: 26,
                    balloon: {
                        adjustBorderColor: false,
                        horizontalPadding: 10,
                        verticalPadding: 8,
                        color: '#ffffff'
                    },
                    dataProvider: data,
                    valueAxes: [{
                        id: 'positionAxis',
                        axisAlpha: 0,
                        position: 'left',
                        title: 'Position',
                        inside: true
                    }, {
                        id: 'pnlAxis',
                        axisAlpha: 0,
                        position: 'right',
                        title: 'Cumulative PnL',
                        inside: true
                    }],
                    graphs: [{
                        alphaField: 'alpha',
                        balloonText: '<span style=\'font-size:12px;\'>[[title]] on [[category]]:<br><span style=\'font-size:20px;\'>[[value]]</span> [[additional]]</span>',
                        fillAlphas: 0,
                        title: 'Position',
                        type: 'step',
                        valueAxis: 'positionAxis',
                        valueField: 'quantity',
                        dashLengthField: 'dashLengthColumn',
                        bullet: 'round',
                        lineThickness: 3,
                        bulletSize: 5,
                        bulletBorderAlpha: 1,
                    }, {
                        id: 'graph2',
                        balloonText: '<span style=\'font-size:12px;\'>[[title]] on [[category]]:<br><span style=\'font-size:20px;\'>[[value]] USD</span></span>',
                        bullet: 'round',
                        lineThickness: 3,
                        bulletSize: 7,
                        bulletBorderAlpha: 1,
                        bulletColor: '#FFFFFF',
                        useLineColorForBulletBorder: true,
                        bulletBorderThickness: 3,
                        fillAlphas: 0,
                        lineAlpha: 1,
                        title: 'PnL',
                        valueAxis: 'pnlAxis',
                        valueField: 'cumulativePnl',
                        dashLengthField: 'dashLengthLine'
                    }],
                    categoryField: 'timestamp',
                    categoryAxis: {
                        gridPosition: 'start',
                        axisAlpha: 0,
                        tickLength: 0,
                        parseDates: true,
                        minPeriod: 'mm',
                    },
                    precision: 0,
                    usePrefixes: true
                });
            }

            var id = 'pos-chart-' + scope.backtestJobDay;

            element.attr('id', id);

            // set height and width
            var height = scope.height || '100%';
            var width = scope.width || '100%';

            element.css({
                'height': height,
                'width': width
            });

            var chart = createChart(id, scope.dataProvider);

            // Event Handlers
            scope.$on('jobPositionsChart.refresh', function (event, data) {

                if (data.jobName && (data.jobName === scope.backtestJobName || data.jobName === 'all')) {
                    console.log('Received event', event.name);

                    if (chart) {
                        chart.validateData();
                    }
                }
            });
        }
    };
}]);
