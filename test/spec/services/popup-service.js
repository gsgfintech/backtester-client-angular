'use strict';

describe('Service: popupService', function () {

  // load the service's module
  beforeEach(module('backtesterclientApp'));

  // instantiate service
  var popupService;
  beforeEach(inject(function (_popupService_) {
    popupService = _popupService_;
  }));

  it('should do something', function () {
    expect(!!popupService).toBe(true);
  });

});
