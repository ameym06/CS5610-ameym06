app.controller("concertAppController", function ($q, $scope, $location, $http, $cookieStore, $modal) {
	$scope.access_token = $cookieStore.get('access_token');
	var concerts = [];
    
    $scope.goToHome = function () {
        $location.path('/');
    };
 
    $scope.events = $location.search().events;
	console.log($scope.events);
	
    $scope.searchConcerts = function () {
       /*Get all events*/
    	var concerts="";
        var query = $scope.query;
        if(query == undefined){
        	alert("Please Enter a Search Term");
        }
        else{
        	var oArgs = {
                    app_key: "QhNBcQmN6gTj3bwm",
                    q: query,
                    "date": "Future",
                    sort_order: "popularity",
                };
                EVDB.API.call("/events/search", oArgs, function (oData) {
                    var Events = oData.events.event;
                    var len = Events.length;
                    for (var i = 0; i < len; i++) {
                    	concerts = concerts.concat(populateConcertInfo(Events[i]));
                    }
                    document.getElementById("concertResults").innerHTML = concerts;
                });
        }
        
      };
    
    
    
        
    function populateConcertInfo(obj) {
    	var event={};
        var performers = obj.performers;
        var performer = "";
        var bio = "";
        if (performers != null) {
            if (performers.performer.length > 1)
                performer = performers.performer[0];
            else
                performer = performers.performer;

            bio = performer.short_bio;
            
            if (performer == undefined) {
                performer = "Information Not Available";
                bio = "";
            }
            
            if (bio == undefined){
            	bio = "Information Not Available";
            }
                
            var location = obj.venue_address + ", " + obj.city_name + ", " + obj.region_name + ", " + obj.country_abbr;
            
            var div = "<div class=\"well text-center\"><span class=\"novaMono\">Artist: " + performer.name + "- " + performer.short_bio + "</span> ";
            div = div.concat("<br/><span>Venue:" + obj.venue_name + "</span><br/><span>Location: " + location + "</span><br/>");
            div = div.concat("<a href=\"" + obj.url + "\" target=\"_blank\">Event Details</a><br/>");
            return div.concat("</div><hr/>");
        }
    };
    
  //Login function
	$scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: './Login.html',
            controller: 'loginController'
        });

        modalInstance.result.then(function () {
            $location.path('/');
        });
        
    };
    
    //Logout function
    $scope.logout = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('uid');
        $scope.access_token = $cookieStore.get('access_token');
        $location.path('/');
    };
    
    //Signup function
    $scope.signUp = function () {
        $location.path('/signup');
    };
    
  //Shortcut to view Profile
    $scope.viewProfile = function(){
    	$location.path('/profile');
    };

});