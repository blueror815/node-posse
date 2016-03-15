
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

	res.render('retailer/distributor/index', {
		username : "username", 
		password : "password", 
		message : "Retailer/Distributor"
	});
};