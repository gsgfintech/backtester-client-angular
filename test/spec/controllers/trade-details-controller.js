'use strict';

describe('Controller: TradeDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var TradeDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TradeDetailsControllerCtrl = $controller('TradeDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TradeDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
