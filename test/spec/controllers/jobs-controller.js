'use strict';

describe('Controller: JobsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var JobsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsControllerCtrl = $controller('JobsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
