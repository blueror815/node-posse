app.controller('AssignTaskCtrl', function($scope, $state, $stateParams, apiService, helper) {
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
	
	
	apiService.GetClientUsers(apiService.getClient()).then(function(users){
	  	$scope.users = users;
	});

	$scope.AssignUser = function(){
		apiService.AssignTask(apiService.getClient(), apiService.getTask(), $scope.user, $scope.reason).then(function(){
			helper.showAlert("The selected user is successfully reassigned to the task.");
			$state.go('app.home');
		},function(res){
			helper.showAlert(res);
		});
	};

});