'use strict';

describe('Directive: jobDetailsPositionsDirective', function () {

  // load the directive's module
  beforeEach(module('backtesterclientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<job-details-positions-directive></job-details-positions-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the jobDetailsPositionsDirective directive');
  }));
});
