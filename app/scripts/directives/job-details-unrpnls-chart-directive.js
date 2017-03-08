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
            link: function (scope, element) {

                function formatCategoryLabel(valueText, serialDataItem, categoryAxis) {
                    return (Number(valueText) / 3600).toFixed(1);
                }

                function createChart(elemId, graphs, dataProvider) {
                    console.log('Rendering pnls chart');

                    return AmCharts.makeChart(elemId, {
                        'type': 'serial',
                        'theme': 'light',
                        'legend': {
                            'useGraphSettings': true
                        },
                        'dataProvider': dataProvider,
                        'synchronizeGrid': true,
                        'valueAxes': [{
                            'title': 'Unrealized Pnl (pips)'
                        }],
                        'graphs': graphs,
                        'chartCursor': {
                            'cursorPosition': 'mouse'
                        },
                        'categoryField': 'time',
                        'categoryAxis': {
                            'labelFunction': formatCategoryLabel,
                            'title': 'Time (hours)'
                        },
                        'export': {
                            'enabled': true,
                            'position': 'bottom-right'
                        }
                    });
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

                // Event Handlers
                scope.$on('jobUnrealizedPnlsChart.refresh', function (event, data) {
                    if (data.jobName && data.jobName === scope.backtestJobName) {
                        console.log('Received event', event.name);

                        if (data.pnlSeries) {
                            var graphs = data.pnlSeries.tradeIds.map(function (tradeId) {
                                return {
                                    'title': tradeId,
                                    'valueField': tradeId,
                                    'balloonText': '[[title]]: [[value]]'
                                };
                            });

                            var chart = createChart(id, graphs, data.pnlSeries.dataProvider);
                        } else {
                            console.error('Data didnt contain any pnl serie');
                        }
                    }
                });
            }
        };
    }]);
