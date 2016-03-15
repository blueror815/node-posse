app.controller('RejectTaskCtrl', function($scope, $state, $stateParams, apiService, helper) {
	$scope.navTitle = '<div class="header_title"><div class="header-logo"></div></div>';
  
	apiService.GetTasksByClient(apiService.getClient()).then(function(tasks){
		for(i = 0; i < tasks.length; i++){
			if (apiService.getTask() == tasks[i]._id){
				$scope.task = {
					name: tasks[i].title,
					location: tasks[i].location.name
				};
				break;
			}
		}
	});
	
	$scope.RejectTask = function(){
		apiService.RejectTask(apiService.getClient(), apiService.getTask(), $scope.reason).then(function(){
			helper.showAlert("The task is successfully rejected.");
			$state.go('app.home');
		},function(res){
			helper.showAlert(res);
		});
	};

});