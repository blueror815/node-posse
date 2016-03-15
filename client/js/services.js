angular.module("ApiServices", ['ionic'])
	.service("apiService", function ($http, $q) {
		return {
			/* for active pages */
			setClient: function(client_id){
				localStorage.setItem('activeClient', client_id);
			},
			getClient: function(){
				return localStorage.getItem('activeClient');
			},
			setTask: function(task_id){
				localStorage.setItem('activeTask', task_id);
			},
			getTask: function(){
				return localStorage.getItem('activeTask');
			},
			/* ebd active pages */

			getToken: function(){
				return localStorage.getItem('token');
			},
			getUsername: function(){
				return localStorage.getItem('username');
			},
			getPassword: function(){
				return localStorage.getItem('password');
			},
			Logout: function(){
				localStorage.setItem('username', '');
				localStorage.setItem('password', '');
				localStorage.setItem('token', '');
			},
			Login: function (username, password) {

					var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://coordinate.ticonerd.com/auth/local',
				    	headers: {
				    		'Content-Type': 'application/json;charset=UTF-8'
				    	},
				    	data: {email : username, password : password}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
					    	if(data.token != ''){
					    		localStorage.setItem("token", data.token);
					    		localStorage.setItem("username", username);
					    		localStorage.setItem("password", password);
					    		//$localstorage.set('username', username);
					    		//$localstorage.set('password', password);
					    		defer.resolve(data);
					    	}else{
					    		defer.resolve(data);
					    	}
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},

			Register: function(username, password) {
				var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://192.168.1.150:3000/api/v1/auth/register',
				    	headers: {
				    		'Content-Type': 'application/json;charset=UTF-8'
				    	},
				    	data: {email : username, password : password}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
					    	if(data.token != ''){
					    		localStorage.setItem("token", data.token);
					    		localStorage.setItem("username", username);
					    		localStorage.setItem("password", password);
					    		//$localstorage.set('username', username);
					    		//$localstorage.set('password', password);
					    		defer.resolve(data);
					    	}else{
					    		defer.resolve(data);
					    	}
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},

			GetClients: function (){

					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/clients',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
					    	this.clients = data;
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientAbilities: function (client_id){

					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/clients/' + client_id + '/abilities',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientSettings: function (client_id){

					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-settings/' + client_id + '/',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientUsers: function (client_id){

					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-users/' + client_id,
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetTaskCollections: function(client_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/collections',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetTasksByBucket: function(bucket_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + bucket_id + '/tasks',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetTasksByClient: function(client_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/query-tasks',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			QueryTasksByClient: function(client_id, title){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/query-tasks?title=' + title,
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientRegions: function(client_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-regions/' + client_id,
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientOffices: function(client_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-offices/' + client_id,
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetClientManagers: function(client_id){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/client-managers/' + client_id,
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			GetUserInfo: function(){
					var defer = $q.defer();

				    var req = {
				    	method: 'GET',
				    	url: 'http://coordinate.ticonerd.com/api/users/',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			CreateTask: function(client_id, taskinfo){
					var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/create',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	},
				    	data: taskinfo
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			AssignTask: function(client_id, task_id, user_id, msg){
					var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/task-assign',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	},
				    	data: {
				    		id: task_id,
				    		user: user_id,
				    		message: msg
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			ResolveTask: function(client_id, task_id, msg){
					var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/task-resolve',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	},
				    	data: {
				    		id: task_id,
				    		markClose: true,
				    		message: msg
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			},
			RejectTask: function(client_id, task_id, msg){
					var defer = $q.defer();

				    var req = {
				    	method: 'POST',
				    	url: 'http://coordinate.ticonerd.com/api/client-tasks/' + client_id + '/task-resolve',
				    	headers: {
				    		'Authorization': 'Bearer ' + this.getToken()
				    	},
				    	data: {
				    		id: task_id,
				    		markClose: false,
				    		message: msg
				    	}
				    }

				    $http(req).
					    success(function(data, status, headers, config) {
				    		defer.resolve(data);
					    }).
					    error(function(data, status, headers, config) {
					    	defer.reject('An error occured while communicating to the server.');
					    });

					return defer.promise;
			}
		};
	});