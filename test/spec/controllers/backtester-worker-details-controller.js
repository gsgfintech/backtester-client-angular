'use strict';

describe('Controller: BacktesterWorkerDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var BacktesterWorkerDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BacktesterWorkerDetailsControllerCtrl = $controller('BacktesterWorkerDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BacktesterWorkerDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
