
app.controller("youtubeAppController", function ($scope, $http, $location, $cookieStore, $modal) {
	$scope.access_token = $cookieStore.get('access_token');
    
    $scope.goToHome = function () {
        $location.path('/');
    };

    var video = "";
    

    $scope.searchVideos =
        function () {
        video = "";
        var request;
        var query = $scope.query;
        if(query == undefined){
        	alert("Please Enter a Search Term")
        }
        else{
        	 $http.get("https://www.googleapis.com/youtube/v3/search?q=" + query +
             "&part=snippet&maxResults=15&key=AIzaSyCK7mxfcBKsGoqKrfmKgaZ2f4udDNaZIak")
             .success(function (res, status) {
                 var len = res.length < 15 ? res.length : 15;
                 console.log(res);
                 for (var i = 0; i < len; i++)
                     $scope.embed(res.items[i]);
             });
        }
       
      };

    $scope.embed = function (response) {
        type = response.id.kind;
        if (type == "youtube#video") {
            if (response.id.videoId != undefined) {
                video = video.concat(refine(response));
                document.getElementById("videoResults").innerHTML = video;
            }
        }
    };


    var refine = function (response) {
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