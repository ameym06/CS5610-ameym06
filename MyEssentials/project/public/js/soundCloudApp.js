//soundCloudController

app.controller("soundCloudController", function ($q, $scope, $location, $cookieStore, $modal, $http) {
	$scope.access_token = $cookieStore.get('access_token');
    
    $scope.goToHome = function () {
        $location.path('/');
    };

    var music = "";
    //Initialize the SoundCloud Service
    SC.initialize(
    {
        client_id: 'd524ae3a3c29de693e5050384202ab43'
    });

    /* Search for music by keyword */
    $scope.searchSongs = function () {
        $scope.fail = false;
        var title = $scope.query;
    	music = "";
    	if(title == undefined){
            $scope.fail = true;
            $scope.failMessage = "Please provide Search Term";
            return;
    	}
    	else{
    		SC.get("/tracks", { q: title }, function (res) {
                var len = res.length < 15 ? res.length : 15;
                for (var i = 0; i < len; i++) {
                    $scope.embed(res[i].permalink_url);
                }
               
            });
    	}
    };

    /* Embed a track in HTML */
    $scope.embed = function (url) {
        var deferred = $q.defer();
       
        SC.oEmbed(url, { auto_play: false }, function (track) {
            deferred.resolve();
            console.log("Title: " + track.title,
                        "font-family: Courier New;");
            console.log("URI: " + url,
                        "font-family: Courier New;");
            music = music.concat(toHTML(track, url)) + "<br/>";
            document.getElementById("musicResults").innerHTML = music;
        });

        return deferred.promise;
    };

   
    /* ember in an HTML style */
    var toHTML = function (obj, url) {
    
      // var div = 
       var div = "<div class=\"well\"><h4>Title:</h4><span class=\"novaMono\"> " + obj.title + "</span>";
        
        div = div.concat("<br/><h4>URL:</h4><span>" + obj.author_url + "</span><br/><br/>" + obj.html.replace("100%", "50%"));
        div = div.replace("400", "120");

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
    
    ///Logout function
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