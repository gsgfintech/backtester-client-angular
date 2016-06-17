'use strict';

describe('Controller: OrderDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var OrderDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderDetailsControllerCtrl = $controller('OrderDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
