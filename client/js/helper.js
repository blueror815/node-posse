angular.module("Helpers", ['ionic'])
	.service("helper", function ($http, $q, $ionicPopup) {
		return {
			// An alert dialog
			showAlert: function(msg) {
			     var alertPopup = $ionicPopup.alert({
			       title: 'Coordinate Mobile',
			       template: msg
			     });

			     alertPopup.then(function(res) {});
			},
			// A confirm dialog
			showConfirm: function(msg) {
			   var confirmPopup = $ionicPopup.confirm({
			     title: 'Coordinate Mobile',
			     template: msg
			   });

			   var defer = $q.defer();

			   confirmPopup.then(function(res) {
			     if(res) {
			       defer.resolve(res);
			     } else {
			       defer.reject(res);
			     }
			   });

			   return defer.promise;
			}
		};
	});