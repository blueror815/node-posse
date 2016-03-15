
var _ = require('underscore');
var utility = require('cloud/controllers/utility/utility');

var Stores = Parse.Object.extend('Stores');

exports.index = function(req, res) { 
	var currentPage = 0;

    if (typeof req.query.page !== 'undefined') {
        currentPage = parseInt(req.query.page);
    }

	var pageSize = 5;
	var pageSkip = currentPage * pageSize;

	var query = new Parse.Query(Stores);


	query.descending('createdAt');

	var totalCount = 0, pageCount = 0, prevPage = 0, nextPage = 0;

	query.count().then(function(result){ 
		
	    if(result % pageSize == 0) {
	    	pageCount = Math.floor(result / pageSize);
	    } else {
	    	pageCount = Math.floor(result / pageSize) + 1;
	    }

		if(currentPage <= 0) {
			prevPage = -1;
		} else {
			prevPage = currentPage - 1;
		}

	    if (currentPage >= pageCount - 1) {
	    	nextPage = -1;
	    } else  {
	    	nextPage = currentPage + 1;
	    }

		query.limit(pageSize);
		query.skip(pageSkip);

		query.find().then(function(results) {
			console.log(results);
			res.render('retailer/stores/index', {
				username : "user",
				password : "user",
				message : "Retailer/Stores",
				stores : results,
				weekday : utility.storeName(),
				currentPage : ++currentPage,
				totalPage : pageCount,
				prevPage : prevPage,
				nextPage : nextPage
			});
		},

		function() {
			res.send(500, 'Failed loading stores');
		});
	});


};

exports.new = function(req, res) {
	res.render('retailer/stores/create', {
		username : "user",
		password : "user",
		message : "Retailer/Stores"
	});
};

exports.create = function(req, res) {
	var store = new Stores();

	var storeName = req.body.storeName;
	store.set("storeName", storeName);

	var storeAddress = req.body.storeAddress;
	store.set("storeName", storeAddress);

	var storeDescription = req.body.storeDescription;
	store.set("storeDescription", storeDescription)

	var fromMonday = req.body.fromMonday;
	var toMonday = req.body.toMonday;
	store.set("fromMonday", fromMonday);
	store.set("toMonday", toMonday);

	var fromTuesday = req.body.fromTuesday;
	var toTuesday = req.body.toTuesday;
	store.set("fromTuesday", fromTuesday);
	store.set("toTuesday", toTuesday);

	var fromWednesday = req.body.fromWednesday;
	var toWednesday = req.body.toWednesday;
	store.set("fromWednesday", fromWednesday);
	store.set("toWednesday", toWednesday);

	var fromThursday = req.body.fromThursday;
	var toThursday = req.body.toThursday;
	store.set("fromThursday", fromThursday);
	store.set("toThursday", toThursday);

	var fromFriday = req.body.fromFriday;
	var toFriday = req.body.toFriday;
	store.set("fromFriday", fromFriday);
	store.set("toFriday", toFriday);

	var fromSaturday = req.body.fromSaturday;
	var toSaturday = req.body.toSaturday;
	store.set("fromSaturday", fromSaturday);
	store.set("toSaturday", toSaturday);

	var fromSunday = req.body.fromSunday;
	var toSunday = req.body.toSunday;
	store.set("fromSunday", fromSunday);
	store.set("toSunday", toSunday);

	// var logo_img = req.body.fileselect;
	// store.set("storeName", storeName);
	// store.set("storeName", storeName);

	// var logo_file = new Parse.File("logo.jpg", {
	// 	base64: req.body.fileselect
	// });
	
	store.save().then(function() {
		res.redirect('/retailer/stores');
	}, function() {
		res.send(500, 'Failed saving store');
	});

	// var store_img1 = req.files.fileselect1;
	// var store_img2 = req.files.fileselect2;

	// if(storeName == "") {}
	/*
	res.render('retailer/stores/create', {
		username : "user",
		password : "user",
		message : toFriday
	});
	*/
	//exports.index(req, res);

	// Explicitly specify which fields to save to prevent bad input data
	/*
	post.save(_.pick(req.body, 'title', 'body')).then(function() {
		res.redirect('/posts');
	},
	function() {
		res.send(500, 'Failed saving post');
	});
	*/

}