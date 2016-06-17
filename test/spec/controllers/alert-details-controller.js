'use strict';

describe('Controller: AlertDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var AlertDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertDetailsControllerCtrl = $controller('AlertDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AlertDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
