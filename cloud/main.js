
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

require('cloud/app.js');


Parse.Cloud.define("hello", function(request, response) {
  response.success("This is web admin hook pan!");
});

Parse.Cloud.define('InsertBeersToParseFromAPI',function(request,response){


                    
    //http://api.brewerydb.com/v2/beer/56UV6l?key=bd30e4dd78f29aec30da08a7ae4d76a1&hasLabels=Y
    var url = "http://api.brewerydb.com/v2/beer/";
    url = url + request.params.breweryId + "?key=bd30e4dd78f29aec30da08a7ae4d76a1&hasLabels=Y";

    var attributedId =  request.params.breweryId//breweryId

    Parse.Cloud.httpRequest({

                url: url,
                success: function(httpResponse) {
                    

                    var JSON1 = JSON.stringify(httpResponse.data);
                    
                    var dataJSON = httpResponse.data;
                    var dataJSONStr = JSON.stringify(dataJSON.data);

                    var dataJSONObj = JSON.parse(dataJSONStr);
                    var name = dataJSONObj.name;    // name
                    var displayName = dataJSONObj.nameDisplay;
                    var description = dataJSONObj.description;
                    var abv = dataJSONObj.abv
                    var ibu = dataJSONObj.ibu
                    var glasswareId = dataJSONObj.glasswareId
                    var srmId = dataJSONObj.srmId
                    var styleId = dataJSONObj.styleId
                    var year = dataJSONObj.year

                    var beerId = dataJSONObj.id

                    var beers1 = new Parse.Object("Brewery");
                    beers1.save({"breweryBeerId":beerId},{success:function(success){


                    },
                    error:function(again, error){

                    }});

                    // labels - image url object
                    var labelsObj = dataJSONObj.labels;
                    var labelsObStr = JSON.stringify(styleObj);
                    var labelJson = JSON.parse(labelsObStr);
                    // Image Url
                    var imageUrl = labelJson.medium;

                    // category object
                    var catObj = dataJSONObj.category;
                    var catObjStr = JSON.stringify(catObj);
                    var catJSON = JSON.parse(catObjStr);
                    // category name
                    var catStr = catJSON.name;


                    // glass object
                    var glassObj = dataJSONObj.glass;
                    var glassObjStr = JSON.stringify(glassObj);
                    var glassJSON = JSON.parse(glassObjStr);
                    //glass name
                    var glassStr = glassJSON.name;

                    var beerAvailableId = dataJSONObj.availableId

                    var beers = new Parse.Object("Brewery");

                    beers.save({"breweryBeerId":attributedId, "beerName":name,"beerNameDisplay":displayName, 
                        "beerDescription":description, "beerAbv":abv, "beerIbu":ibu, "beerGlasswareId":glasswareId, 
                        "glassName":glassStr,"beerSrmId":srmId,"beerAvailableId":beerAvailableId, "beerStyleId":styleId, 
                        "beerYear":year, "beerStyleCat":catStr, "beerImageUrl":imageUrl},{success:function(success){


                    },
                    error:function(again, error){

                    }});

                },
                error: function(httpResponse) {

                    var failer = new Array();
                    failer[0] = "fail";
                    failer[1] = httpResponse.status;
                    response.success(failer);

                }
            });
});


Parse.Cloud.define('InsertBreweries',function(request,response){



			Parse.Cloud.httpRequest({

			    url: request.params.url,
			    success: function(httpResponse) {
			        
    				var JSON1 = JSON.stringify(httpResponse.data);
    				
    				var dataJSON = httpResponse.data;
    				var dataJSONStr = JSON.stringify(dataJSON.data);

    				var dataJSONObj = JSON.parse(dataJSONStr);
    				var name = dataJSONObj.name;    // name
                    var beerId = dataJSONObj.id;
                    var displayName = dataJSONObj.nameDisplay;

                    var styleObj = dataJSONObj.style;
                    var styleObStr = JSON.stringify(styleObj);
                    var styleJSON = JSON.parse(styleObStr);

                    var styleName = styleJSON.shortName;
                    var description = styleJSON.description;


    				var ibuMin = styleJSON.ibuMin;
    				var ibuMax = styleJSON.ibuMax;
    				var abvMin = styleJSON.abvMin;
    				var abvMax = styleJSON.abvMax;
    				var srmMin = styleJSON.srmMin;
    				var srmMax = styleJSON.srmMax;
    				var ogMin = styleJSON.ogMin;
    				var fgMin = styleJSON.fgMin;
    				var fgMax = styleJSON.fgMax;
    				var createdDate = styleJSON.updateDate;
    				var imageUrl = "";

                    var beerApiUrl = "http://api.brewerydb.com/v2/beer/";
                    beerApiUrl = beerApiUrl + beerId + "/breweries?key=bd30e4dd78f29aec30da08a7ae4d76a1"; 
                    imageUrl = "";
    				

    				var beers = new Parse.Object("BreweryBeers");


					beers.save({"name":name, "nameDisplay":displayName,"breweryId":beerId, "styleName":styleName, "description":description, "ibuMin":ibuMin, "ibuMax":ibuMax, "abvMin":abvMin,"abvMax":abvMax,"srmMin":srmMin, "srmMax":srmMax, "ogMin":ogMin, "fgMin":fgMin, "fgMax":fgMax, "createdDate":createdDate, "imageUrl":imageUrl},{success:function(success){


					},
					error:function(again, error){

					}});



			    },
			    error: function(httpResponse) {
			        var failer = new Array();
			        failer[0] = "fail";
			        failer[1] = httpResponse.status;
			        response.success(failer);

			    }
			});

});

Parse.Cloud.afterSave('BreweryBeers',function(request){

                    
            var query = new Parse.Query("BreweryBeers");
            query.equalTo("breweryId", request.object.get("breweryId"));

            var beerId = request.object.get("breweryId");
            var beerApiUrl = "http://api.brewerydb.com/v2/beer/";
            beerApiUrl = beerApiUrl + beerId + "/breweries?key=bd30e4dd78f29aec30da08a7ae4d76a1"; 

            var categoryName =  request.object.get("styleName");
            
            Parse.Cloud.httpRequest({

                url: beerApiUrl,
                success: function(httpResponse) {

                            var dataJSON = httpResponse.data;
                            var dataObject = dataJSON.data[0];
                            var beerObj = request.object;
                            var dataJSONStr = JSON.stringify(dataJSON.data[0]);

                            var beerObjJSON = JSON.parse(dataJSONStr);

                            var beerImageObject = beerObjJSON.images;
                            var beerImageUrlStr = JSON.stringify(beerImageObject);
                            var beerImages = JSON.parse(beerImageUrlStr);

                            beerObj.set("imageUrl", beerImages.large);

                            beerObj.save(null,{
                                success:function(success){


                                    // save category

                                    var categoryObj = Parse.Object.extend("BreweryBeersCategories");
                                    var catQuery = new Parse.Query(categoryObj);
                                    catQuery.equalTo("categoryName", categoryName);

                                    catQuery.find
                                    ({
                                        success: function(results)
                                        {
                                            if(results.length > 0)
                                            {

                                            }
                                            else
                                            {
                                                var newCatObj = Parse.Object.extend("BreweryBeersCategories");
                                                var newObj = new newCatObj();
                                                newObj.save({"breweryId":beerId, "categoryName":categoryName},{success:function(success){
                                                    
                                                },
                                                error:function(again, error){

                                                }});    
                                            }
                                        }
                                    });


                                },
                                error:function(again, error){

                                }
                            });

                },
                error: function(httpResponse) {
                    var failer = new Array();
                    failer[0] = "fail";
                    failer[1] = httpResponse.status;
                    response.success(failer);

                }
            });

});