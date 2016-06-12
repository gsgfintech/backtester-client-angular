'use strict';

describe('Directive: workerConfigEditDirective', function () {

  // load the directive's module
  beforeEach(module('backtesterclientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<worker-config-edit-directive></worker-config-edit-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the workerConfigEditDirective directive');
  }));
});
