'use strict';

describe('Controller: BacktesterWorkersDeleteControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var BacktesterWorkersDeleteControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BacktesterWorkersDeleteControllerCtrl = $controller('BacktesterWorkersDeleteControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BacktesterWorkersDeleteControllerCtrl.awesomeThings.length).toBe(3);
  });
});
