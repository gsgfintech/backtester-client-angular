'use strict';

describe('Controller: BacktesterWorkersControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var BacktesterWorkersControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BacktesterWorkersControllerCtrl = $controller('BacktesterWorkersControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BacktesterWorkersControllerCtrl.awesomeThings.length).toBe(3);
  });
});
