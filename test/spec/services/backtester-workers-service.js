'use strict';

describe('Service: backtesterWorkersService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var backtesterWorkersService;
  beforeEach(inject(function (_backtesterWorkersService_) {
    backtesterWorkersService = _backtesterWorkersService_;
  }));

  it('should do something', function () {
    expect(!!backtesterWorkersService).toBe(true);
  });

});
