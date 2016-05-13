'use strict';

describe('Controller: BacktesterWorkersAddControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var BacktesterWorkersAddControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BacktesterWorkersAddControllerCtrl = $controller('BacktesterWorkersAddControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BacktesterWorkersAddControllerCtrl.awesomeThings.length).toBe(3);
  });
});
