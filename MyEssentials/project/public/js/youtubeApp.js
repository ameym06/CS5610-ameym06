//youtubeAppController

app.controller("youtubeAppController", function ($scope, $http, $location, $cookieStore, $modal) {
	
    //access token required to show/hide elements of navigation bar
    $scope.access_token = $cookieStore.get('access_token');
    
    $scope.goToHome = function () {
        $location.path('/');
    };

    var video = "";
    
    //function to search videos. This function invokes the Youtube API
    $scope.searchVideos = function () {
        $scope.fail = false;
        video = "";
        var request;
        var query = $scope.query;
        if(query == undefined){
            $scope.fail = true;
            $scope.failMessage = "Please enter a Search Term";
            return;
        }
        else{
        	 $http.get("https://www.googleapis.com/youtube/v3/search?q=" + query +
             "&part=snippet&maxResults=15&key=AIzaSyCK7mxfcBKsGoqKrfmKgaZ2f4udDNaZIak")
             .success(function (res, status) {
                 var len = res.length < 15 ? res.length : 15;
                 for (var i = 0; i < len; i++)
                     $scope.embed(res.items[i]);
             });
        }
       
      };

    //Embed the videos in HTML
    $scope.embed = function (response) {
        type = response.id.kind;
        if (type == "youtube#video") {
            if (response.id.videoId != undefined) {
                video = video.concat(toHTML(response));
                document.getElementById("videoResults").innerHTML = video;
            }
        }
    };

    //function to create <div> for every element
    var toHTML = function (response) {
        var div = "<div class=\"well text-center\"><div class=\"container\"><h4 class=\"novaMono\">Title: " + response.snippet.title + "</h4></div> ";
        div = div.concat("<div class=\"container\"><span>Channel: " + response.snippet.channelTitle + "</span></div> ");
        div = div.concat("<iframe type='text/html' width='50%' height='300px' " +
            "src='https://www.youtube.com/embed/" + response.id.videoId +
                    "' frameborder='0' accesskey></iframe></hr/>");
        return div.concat("</div><hr/>");
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
        $http.post("/api/logout")
        .success(function(){
            $cookieStore.remove('access_token');
            $cookieStore.remove('uid');
            $scope.access_token = $cookieStore.get('access_token');
            $location.url($location.path('/'));
            $location.path('/');
        });
        
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