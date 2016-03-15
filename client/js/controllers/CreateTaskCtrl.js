app.controller('CreateTaskCtrl', function($scope, $stateParams, apiService, helper) {
	$scope.navTitle = '<div class="header_title"><div class="header-logo"></div></div>';
  
	apiService.GetClientUsers(apiService.getClient()).then(function(users){
	  	$scope.users = users;
	});

	apiService.GetClientOffices(apiService.getClient()).then(function(stores){
	  	$scope.stores = stores;
	});

	apiService.GetTaskCollections(apiService.getClient()).then(function(buckets){
	  	$scope.buckets = buckets;
	});

});