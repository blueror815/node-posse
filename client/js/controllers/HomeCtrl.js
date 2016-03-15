app.controller('HomeCtrl', function ($scope, apiService, helper, $state, $stateParams, $timeout, $http, ionicMaterialInk, $interval) {
	$scope.navTitle = '<div class="header-logo"></div>'; //'<div class="header_title"><span class="logo_title"></span>Coordinate</div>';
	// $timeout(function() {
	//   $scope.$parent.showHeader();
	// }, 0);

	// $scope.$on('$ionicView.enter', function(e) {
	//   $ionicNavBarDelegate.showBar(true);
	// });	

	apiService.GetClients().then(function(clients){
		first_client = clients[0];
		apiService.setClient(first_client._id);

		//draw circles
		apiService.GetTaskCollections(first_client._id).then(function(buckets){

	        // The json data will now be in scope.
	        buckets.sort(function(a, b){return b.taskCount -a.taskCount});
			var sum = buckets[0].taskCount + buckets[1].taskCount;
		    var getVW = $(".circle_contain");
		    var viewport = $(window);
		    var min_box = 70;
		    var max_font = 80;
		    var min_font = 18;
		    var one_font = (max_font - min_font) / sum;
		    var width_inside = 0;
		    var left_margin = 0;

		    inside_height = viewport.height() - 180;
		    if(viewport.width() > inside_height){
		        width_inside = inside_height;
		        left_margin = (viewport.width() - inside_height) / 2;
		    }else{
		        width_inside = viewport.width();
		    }

		    getVW.css({
		      width: width_inside,
		      height: width_inside,
		      left: left_margin+'px'
		    });

		    var padding = 10;
		    width_inside -= 2 * padding;
		    var one_box = (width_inside - min_box * 2)  / sum;

		    Ra = (min_box + (buckets[0].taskCount - 1) * one_box) / 2;
		    Ax = Ay = 0;
		    font_size0 = min_font + (buckets[0].taskCount- 1) * one_font;

		    drawCircle(0, buckets[0].taskCount, Ax + padding, Ay + padding, Ra, font_size0, buckets[0].name, 'red');

		    Rb = (min_box + (buckets[1].taskCount - 1) * one_box) / 2;
		    Bx = Ra + (Ra + Rb) * Math.cos(45 * Math.PI / 180) - Rb;
		    By = Ra + (Ra + Rb) * Math.sin(45 * Math.PI / 180) - Rb;
		    font_size1 = min_font + (buckets[1].taskCount- 1) * one_font;

		    gap = (width_inside - Bx - 2 * Rb) / 2;
		    Bx += gap; By += gap;

		    drawCircle(1, buckets[1].taskCount, Bx + padding, By + padding, Rb, font_size1, buckets[1].name, 'orange');

		    if (buckets[2].taskCount > 0){
			    Rd = (min_box + (buckets[2].taskCount - 1) * one_box) / 2;
			    Dx = 2 * Ra + 5;
			    Dy = By - 2 * Rd - 5;
			    font_size2 = min_font + (buckets[2].taskCount- 1) * one_font;

			    drawCircle(2, buckets[2].taskCount, Dx + padding, Dy + padding, Rd, font_size2, buckets[2].name, 'yellow');

			    if (buckets[3].taskCount > 0){
				    Rc = (min_box + (buckets[3].taskCount - 1) * one_box) / 2;
				    Cx = Bx - 2 * Rc - 5;
				    Cy = 2 * Ra + 5;
				    font_size3 = min_font + (buckets[3].taskCount- 1) * one_font;

				    drawCircle(3, buckets[3].taskCount, Cx + padding, Cy + padding, Rc, font_size3, buckets[3].name, 'green');
				}
			}
/*
			angular.forEach(buckets, function(bucket, key){
				apiService.GetTasksByBucket(bucket._id).then(function(tasks){
					console.log(tasks);
				});
			});
*/
		},
		function(res){
			helper.showAlert(res);
		});

		$scope.now = new Date();
		//top 3 tasks
		apiService.GetTasksByClient(first_client._id).then(function(tasks){
			console.log(tasks);
			top_3tasks = new Array();
			
			for(i = 0; i < 3 && i < tasks.length; i++){
				top_3tasks.push(tasks[i]);
			}
			$scope.top_3tasks = top_3tasks;

			apiService.setTask(tasks[0]._id);

			$interval(function(){
				$scope.now = new Date();
			}, 1000);
		},
		function(res){
			helper.showAlert(res);
		});
		
	},
	function(res){
		helper.showAlert(res);
	});
	
	$scope.formatCountdown = function(due_date_string, now){
		due = new Date(due_date_string);
		if (due > now){
			diff = "";
			timeDiff = Math.floor((due.getTime() - now.getTime()) / 1000);
			s = timeDiff % 60;
			if (s > 0){
				diff = s + "s";
			}
			timeDiff = Math.floor(timeDiff / 60);
			m = timeDiff % 60;
			if (m > 0){
				diff = m + "m " + diff;
			}
			timeDiff = Math.floor(timeDiff / 60);
			h = timeDiff % 24;
			if (h > 0){
				diff = h + "h " + diff;
			}
			d = Math.floor(timeDiff / 24);
			if (d > 0){
				diff = d + "d " + diff;
			}
			
			if (diff == ""){
				diff = "0s";
			}
		}else{
			diff = "Already due";
		}

		return diff;
	}

    drawCircle = function(pindex, value, pleft, ptop, pr, pfont_size, pcat, pcolor) {
        pwidth = pr * 2;
        pheight = pr * 2;
        jQuery(".circle_contain").append('<a href="#/app/task" id="c_' + pindex + '"></a>');
        jQuery('#c_' + pindex).css({"width": pwidth, "height": pheight, "line-height" : (pheight - 10) +"px", "font-size" : pfont_size+"px", "top" : ptop + "px", "left" : pleft + "px"});
        jQuery('#c_' + pindex).addClass(pcolor);
        jQuery('#c_' + pindex).html(value + "<span>" + pcat + "</span>");
        span_btm = pwidth/8;
        jQuery('#c_' + pindex + " span").css({"bottom": span_btm+"px", "font-size": "13px"});
    };

    $scope.viewTask = function(task_id){
    	apiService.setTask(task_id);
    	$state.go('app.task');
    }

});