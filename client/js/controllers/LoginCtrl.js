app.controller('LoginCtrl', function ($scope, apiService, helper, $ionicSideMenuDelegate, $http, $ionicNavBarDelegate, $ionicHistory, $timeout, $state, $location, ionicMaterialInk) {
    $scope.loginData = {};
  // $timeout(function() {
  //     $scope.$parent.hideHeader();
  // }, 0);

  // $scope.$on('$ionicView.enter', function(e) {
  //     $ionicNavBarDelegate.showBar(false);
  //     $scope.$parent.hideHeader();
  // });
    ionicMaterialInk.displayEffect();

    $scope.doLogin = function() {
    // $state.go("app.home", null, {reload: true});
    // $location.path("app/home");    

        var username = $scope.loginData.username;
        var password = $scope.loginData.password;
        apiService.Login(username,password).then(function(response){

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

    $scope.goRegister = function() {
        $state.go('register');
    }; 
});