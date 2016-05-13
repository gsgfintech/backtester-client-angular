'use strict';

describe('Service: stratFileUploadService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var stratFileUploadService;
  beforeEach(inject(function (_stratFileUploadService_) {
    stratFileUploadService = _stratFileUploadService_;
  }));

  it('should do something', function () {
    expect(!!stratFileUploadService).toBe(true);
  });

});
