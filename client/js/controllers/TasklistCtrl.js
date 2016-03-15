app.controller('TasklistCtrl', function ($scope, apiService, helper, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();

	apiService.GetTasksByClient(apiService.getClient()).then(function(tasks){
		$scope.tasks = tasks;
	},
	function(res){
		helper.showAlert(res);
	});

});