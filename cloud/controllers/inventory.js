
var _ = require('underscore');

//var Inventory = Parse.Object.extend('Inventory');

exports.index = function(req, res) {
	/*
	var query = new Parse.Query(Post);
	query.descending('createdAt');
	query.find().then(function(results) {
	res.render('posts/index', { 
	  posts: results
	});
	},
	function() {
	res.send(500, 'Failed loading posts');
	});
	*/
		Parse.User.logIn("user", "user", {
	  success: function(user) {
	  	
	  	var currentUser = Parse.User.current();

	    // Do stuff after successful login.
    	if(user.get("permission") == "admin"){
    		res.render('dashboard', {username:user, password:pass});
    	}
    	else if(user.get("permission") == "retailer")
    	{
    		var st = user.getSessionToken();
			Parse.User.become(st).then(function (user) {
			  res.render('retailer/inventory/index', {username:"fsafsdf", password:user.get("password"), message: "Dahsboard/Retialser"});
			}, function (error) {
			  res.render('login', {message: 'Error, Failed Session Token'});
			});

    		
    	}
    	else
    	{
    		res.render('login', {message: 'Error, invalid credentials'});
    	}
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
		res.render('login', {message: 'Error, invalid credentials'});
	  }
	});

};