'use strict';

describe('Service: systemsService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var systemsService;
  beforeEach(inject(function (_systemsService_) {
    systemsService = _systemsService_;
  }));

  it('should do something', function () {
    expect(!!systemsService).toBe(true);
  });

});
