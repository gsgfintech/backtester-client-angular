'use strict';

describe('Controller: JobSearchControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('backtesterclientApp'));

  var JobSearchControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobSearchControllerCtrl = $controller('JobSearchControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobSearchControllerCtrl.awesomeThings.length).toBe(3);
  });
});
