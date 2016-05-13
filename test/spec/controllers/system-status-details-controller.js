'use strict';

describe('Controller: SystemStatusDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var SystemStatusDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SystemStatusDetailsControllerCtrl = $controller('SystemStatusDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SystemStatusDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
