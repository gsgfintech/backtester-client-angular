'use strict';

angular.module('backtesterclientApp')
.factory('SystemsConfigsService', ['$resource', 'systemsServiceEndpoint', function ($resource, systemsServiceEndpoint) {
    var address = systemsServiceEndpoint + 'api/systemsconfig/:id';

    return $resource(address, { id: '@_id' },
	{
	    update: {
	        method: 'PUT' // this method issues a PUT request
	    }
	});
}]);
