'use strict';

describe('Service: backtesterClientHubService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var backtesterClientHubService;
  beforeEach(inject(function (_backtesterClientHubService_) {
    backtesterClientHubService = _backtesterClientHubService_;
  }));

  it('should do something', function () {
    expect(!!backtesterClientHubService).toBe(true);
  });

});
