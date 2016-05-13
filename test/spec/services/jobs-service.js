'use strict';

describe('Service: jobsService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var jobsService;
  beforeEach(inject(function (_jobsService_) {
    jobsService = _jobsService_;
  }));

  it('should do something', function () {
    expect(!!jobsService).toBe(true);
  });

});
