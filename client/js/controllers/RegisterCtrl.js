app.controller('RegisterCtrl', function ($scope, apiService, helper, $ionicSideMenuDelegate, $http, $ionicNavBarDelegate, $ionicHistory, $timeout, $state, $location, ionicMaterialInk) {
    $scope.regData = {};
  // $timeout(function() {
  //     $scope.$parent.hideHeader();
  // }, 0);

  // $scope.$on('$ionicView.enter', function(e) {
  //     $ionicNavBarDelegate.showBar(false);
  //     $scope.$parent.hideHeader();
  // });
    ionicMaterialInk.displayEffect();

    $scope.doRegister = function() {
    // $state.go("app.home", null, {reload: true});
    // $location.path("app/home");    

        var username = $scope.regData.username;
        var password = $scope.regData.password;

        console.log("username and password are " + username + "," + password);
        
        apiService.Register(username, password).then(function(response){

            if(response.token != ''){
                $state.go("app.home", null, {reload: true});
                $location.path("app/home");
            }else{
                helper.showAlert(response.message);
            }
        }, function(response){
            helper.showAlert(response);
        });
    }; 

    $scope.goLogin = function () {
        // body...
        $state.go('login');
    }
});