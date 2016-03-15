
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
var _ = require('underscore');

// Controllers
var loginController = require('cloud/controllers/login.js');
var storesController = require('cloud/controllers/stores.js');
var ordersController = require('cloud/controllers/orders.js');
var inventoryController = require('cloud/controllers/inventory.js');
var dashboardController = require('cloud/controllers/dashboard.js');
var distributorController = require('cloud/controllers/distributor.js');
var marketingController = require('cloud/controllers/marketing.js');

app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.methodOverride());

var http = require('http');

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.

app.get('/', loginController.start);

app.get('/login', loginController.login);

app.get('/logout', loginController.logout);

app.post('/admin-dashboard', storesController.index);

app.get('/admin-dashboard', loginController.login);

app.get('/retailer/stores', storesController.index);

app.get('/retailer/stores/new', storesController.new);

app.post('/retailer/stores', storesController.create);

app.get('/retailer/inventory', inventoryController.index); 

app.get('/retailer/orders', ordersController.index);

app.get('/retailer/dashboard', dashboardController.index);

app.get('/retailer/distributor', distributorController.index);

app.get('/retailer/marketing', marketingController.index);

app.get('/dashboard', function(req, res) {

	var cUser = Parse.User.current();

	res.render('dashboard', {"message" : JSON.stringify(cUser)});
});

app.get('/layout', function(req, res) {
	res.render('layout', "");
});

app.get('/typography', function(req, res) {
	res.render('typography', "");
});

app.get('/forms', function(req, res) {
	res.render('forms', "");
});

app.get('/tables', function(req, res) {
	res.render('tables', "");
});

app.get('/components', function(req, res) {
	res.render('components', "");
});

app.get('/javascript', function(req, res){
	res.render('javascript', "");

});
app.get('/extras-icons', function(req, res){

	res.render('extras-icons', "");

});


/*
retailer
*/
app.get('/dashboard-retailers', function(req, res){

	var curUser  = Parse.User.current();

	res.render('retailer/dashboard-retailers', {username:"user", password:"pass"});

});
app.get('/getStoresList', function(req, res){

	var pageIdx = req.query.pageIdx;

	response = "page  " + pageIdx;

	res.send(response);

});


app.get('/stores-index', function(req, res){

	res.render('retailer/stores-index', "");

});
app.get('/store-view', function(req, res){

	res.render('retailer/store-view', "")
});
app.get('/stores-edit', function(req, res){

	res.render('retailer/stores-edit', "")
});
//inventory-edit
app.get('/inventory-edit', function(req, res){

	res.render('retailer/inventory-edit', "")
});
//inventory-distributor
app.get('/inventory-distributor', function(req, res){

	res.render('retailer/inventory-distributor', "")
});
//inventory-order
app.get('/inventory-order', function(req, res){

	res.render('retailer/inventory-order', "")
});







/*
WebHook API
*/


// web hook from Brewery API
app.post('/webhook', function(req, res){


    var JSON1 = JSON.stringify(req.body);
    var reqStr = JSON1;	


	var attribute = req.body.attribute;
	var attributeId = req.body.attributeId;
	var action = req.body.action;
	var subAction = req.body.subAction;
	var subAttributeId = req.body.subAttributeId;
	var timestamp = req.body.timestamp;

	var beerApiUrl = "http://api.brewerydb.com/v2/beer/";
	beerApiUrl = beerApiUrl + attributeId + "?key=bd30e4dd78f29aec30da08a7ae4d76a1"; 


	var beers = new Parse.Object("Brewery");
	


	var beer = Parse.Object.extend("BreweryBeers");
	var query = new Parse.Query(beer);
	query.equalTo("breweryId", attributeId);


	query.find({

		success:function(results){

			if(results.length > 0)
			{
				
				
			}
			else
			{

				Parse.Cloud.run('InsertBreweries', {"url":beerApiUrl});

			}


		},
		error:function(error){


			// alert("error :" + error.code + " " + error.message);

		}

	});

	

});
app.get('/webhook', function(req, res){



	//InsertBeers

});

app.post("/webhookBeer", function(req, res){


	var JSON1 = JSON.stringify(req.body);
    var reqStr = JSON1;	


	var attribute = req.body.attribute;
	var attributeId = req.body.id;
	var action = req.body.action;
	var subAction = req.body.subAction;
	var subAttributeId = req.body.subAttributeId;
	var timestamp = req.body.timestamp;


	var beer = Parse.Object.extend("Brewery");
	var query = new Parse.Query(beer);
	query.equalTo("breweryBeerId", attributeId);


	if(subAction == "")
	{
		
	}

	query.find({

		success:function(results){

			if(results.length > 0)
			{
				
				
			}
			else
			{

				// Parse.Cloud.run('InsertBeersToParseFromAPI', {"breweryId":attributeId});


			}


		},
		error:function(error){


			// alert("error :" + error.code + " " + error.message);

		}

	});



});


app.listen();
