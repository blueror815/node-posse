app.controller('TaskCtrl', function($scope, apiService, helper, $state, $stateParams) {
	$scope.navTitle = '<div class="header_title"><div class="header-logo"></div></div>';

	apiService.GetTasksByClient(apiService.getClient()).then(function(tasks){
		$scope.tasks = tasks;

		for(i = 0; i < tasks.length; i++){
			if (apiService.getTask() == tasks[i]._id){
				$scope.task = {
					name: tasks[i].name,
					location: tasks[i].location.name
				};
				break;
			}
		}
	});

  $scope.slideHasChanged = function(index) {
    jQuery('#cslide_index').html("<span>"+(index + 1)+"</span>/" + $scope.tasks.length);
  }

  $scope.RejectTask = function(){
  	$state.go('app.rejecttask');
  }

  $scope.ResolveTask = function(){
  	$state.go('app.resolvetask');
  }

  $scope.AssignTask = function(){
  	$state.go('app.reassigntask');
  }

});