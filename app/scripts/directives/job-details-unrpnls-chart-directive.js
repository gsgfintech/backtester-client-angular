'use strict';

angular.module('backtesterclientApp')
.directive('jobUnrealizedPnlsChart', [function () {
    return {
        template: '<div></div>',
        restrict: 'A',
        scope: {
            backtestJobName: '=name',
            dataProvider: '=data',
            height: '@',
            width: '@'
        },
        link: function (scope, element, JobsService) {
            function createChart(elemId, pnlSeries) {
                console.log('Rendering pnls chart');

                return AmCharts.makeChart(elemId, {
                    "type": "serial",
                    "theme": "light",
                    "marginRight": 80,
                    "autoMarginOffset": 20,
                    "marginTop": 7,
                    "dataProvider": pnlSeries,
                    "valueAxes": [{
                        "axisAlpha": 0.2,
                        "dashLength": 1,
                        "position": "left"
                    }],
                    "mouseWheelZoomEnabled": true,
                    //"graphs": [{
                    //    "id": "g1",
                    //    "balloonText": "[[value]]",
                    //    "bullet": "round",
                    //    "bulletBorderAlpha": 1,
                    //    "bulletColor": "#FFFFFF",
                    //    "hideBulletsCount": 50,
                    //    "title": "red line",
                    //    "valueField": "visits",
                    //    "useLineColorForBulletBorder": true,
                    //    "balloon": {
                    //        "drop": true
                    //    }
                    //}],
                    'graphs': pnlSeries.map(function (serie) {
                        return {
                            'id': serie.TradeId,
                            "balloonText": "[[value]]",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "title": "red line",
                            "valueField": "visits",
                            "useLineColorForBulletBorder": true,
                            "balloon": {
                                "drop": true
                            }
                        }
                    }),
                    "chartCursor": {
                        "limitToGraph": "g1"
                    },
                    "categoryField": "date",
                    "categoryAxis": {
                        "parseDates": true,
                        "axisColor": "#DADADA",
                        "dashLength": 1,
                        "minorGridEnabled": true
                    },
                    "export": {
                        "enabled": true
                    }
                });
            }

            // this method is called when chart is first inited as we listen for "rendered" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
            }


            // generate some random data, quite different range
            function generateChartData() {
                var chartData = [];
                var firstDate = new Date();
                firstDate.setDate(firstDate.getDate() - 5);

                for (var i = 0; i < 1000; i++) {
                    // we create date objects here. In your data, you can have date strings
                    // and then set format of your dates using chart.dataDateFormat property,
                    // however when possible, use date objects, as this will speed up chart rendering.
                    var newDate = new Date(firstDate);
                    newDate.setDate(newDate.getDate() + i);

                    var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

                    chartData.push({
                        date: newDate,
                        visits: visits
                    });
                }
                return chartData;
            }

            var id = 'pnls-chart-' + scope.backtestJobName;

            element.attr('id', id);

            // set height and width
            var height = scope.height || '100%';
            var width = scope.width || '100%';

            element.css({
                'height': height,
                'width': width
            });

            //JobsService.getUnrealizedPnlSeries(scope.backtestJobName, function (err) {
            //    console.error(err);
            //}, function (pnlSeries) {
            //    var chart = createChart(id, pnlSeries);
            //});

            var chartData1 = [];
            var chartData2 = [];
            var chartData3 = [];
            var chartData4 = [];

            generateChartData();

            function generateChartData() {
                var firstDate = new Date();
                firstDate.setDate(firstDate.getDate() - 500);
                firstDate.setHours(0, 0, 0, 0);

                for (var i = 0; i < 500; i++) {
                    var newDate = new Date(firstDate);
                    newDate.setDate(newDate.getDate() + i);

                    var a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
                    var b1 = Math.round(Math.random() * (1000 + i)) + 500 + i * 2;

                    var a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
                    var b2 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

                    var a3 = Math.round(Math.random() * (100 + i)) + 200;
                    var b3 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

                    var a4 = Math.round(Math.random() * (100 + i)) + 200 + i;
                    var b4 = Math.round(Math.random() * (100 + i)) + 600 + i;

                    chartData1.push({
                        "date": newDate,
                        "value": a1,
                        "volume": b1
                    });
                    chartData2.push({
                        "date": newDate,
                        "value": a2,
                        "volume": b2
                    });
                    chartData3.push({
                        "date": newDate,
                        "value": a3,
                        "volume": b3
                    });
                    chartData4.push({
                        "date": newDate,
                        "value": a4,
                        "volume": b4
                    });
                }
            }
            // Event Handlers
            scope.$on('jobUnrealizedPnlsChart.refresh', function (event, data) {
                if (data.jobName && data.jobName === scope.backtestJobName) {
                    console.log('Received event', event.name);
                    var chart = createChart(id, data.pnlSeries);

                    //if (chart) {
                    //    chart.validateData();
                    //}
                }
            });
        }
    };
}]);
