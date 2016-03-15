// Coordinate Mobile App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'coordinate' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('coordinate', ['ionic', 'ionic-material', 'ApiServices', 'Helpers', 'ui.validate']);

app.run(function ($ionicPlatform, $state, $location, apiService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if (apiService.getUsername() != undefined && apiService.getPassword() != undefined){
            apiService.Login(apiService.getUsername(), apiService.getPassword()).then(function(response){
              if(response.token != ''){
                $state.go("app.home", null, {reload: true});
                $location.path("app/home");
              }else{
                $state.go('login');
              }
            }, function(){
                $state.go('login');
            });
        }else{
            $state.go('login');
        }

    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider

        .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        })

        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: 'RegisterCtrl'
        })

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })

        .state('app.task', {
            url: '/task',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/task.html',
                    controller: 'TaskCtrl'
                }
            }
        })

        .state('app.tasklist', {
            url: '/task/list',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/list.html',
                    controller: 'TasklistCtrl'
                }
            }
        })

        .state('app.rejecttask', {
            url: '/task/reject',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/reject.html',
                    controller: 'RejectTaskCtrl'
                }
            }
        })

        .state('app.reassigntask', {
            url: '/task/reassign',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/reassign.html',
                    controller: 'AssignTaskCtrl'
                }
            }
        })

        .state('app.resolvetask', {
            url: '/task/resolve',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/resolve.html',
                    controller: 'ResolveTaskCtrl'
                }
            }
        })

        .state('app.newtask', {
            url: '/task/new',
            views: {
                'menuContent': {
                    templateUrl: 'templates/task/new.html',
                    controller: 'CreateTaskCtrl'
                }
            }
        })
        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
