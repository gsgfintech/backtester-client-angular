'use strict';

describe('Directive: orderDetailsDirective', function () {

  // load the directive's module
  beforeEach(module('backtesterclientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<order-details-directive></order-details-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the orderDetailsDirective directive');
  }));
});
