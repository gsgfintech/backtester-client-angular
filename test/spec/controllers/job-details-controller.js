'use strict';

describe('Controller: JobDetailsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var JobDetailsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobDetailsControllerCtrl = $controller('JobDetailsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobDetailsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
