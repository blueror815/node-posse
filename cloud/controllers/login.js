
var _ = require('underscore');

exports.start = function(req, res) {
	res.render('login', { message: 'START : Congrats, you just set up your app!' });
};

exports.login = function(req, res) {
  res.render('login', { message: 'LOGIN : Congrats, you just set up your app!' });
};

exports.logout = function(req, res) {
  Parse.User.logOut();
  res.render('login', { message: 'You just sign out your app!' });
};

exports.index = function(req, res) {

	var user = req.body.username;
	var pass = req.body.password;

	if(user == "" || pass == "")
	{
		res.render('login', {message: 'Error, invalid credentials'});
	}

	// var userObject = Parse.Object.extend("_User");
	// var query = new Parse.Query(userObject);
	// query.equalTo("username", user);
	// query.equalTo("password", pass);
	Parse.User.logIn(user, pass, {
	  success: function(user) {
	  	
	  	var currentUser = Parse.User.current();

	    // Do stuff after successful login.
    	if(user.get("permission") == "admin") {
    		res.render('dashboard', {username:user, password:pass});
    	}
    	else if(user.get("permission") == "retailer")
    	{
			res.render('retailer/stores/index', {username: user.get("username"), password:user.get("password"), message: "Dahsboard/Retialser"});
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