/* Add a track to favorite music */
var addFavMusic = function(meta)
{
    var url = meta.substr(0, meta.indexOf(DELIMITER));
    var title = meta.substr(meta.indexOf(DELIMITER) + 11);
    var xmlHttp = new XMLHttpRequest();
    url = url.replace("http://", "http");
    url = url.replace(new RegExp("/", "g"), DELIMITER);
    xmlHttp.open("PUT", "/api/user/" + uid + "/music/" + url, false);
    xmlHttp.send(null);

    /* Log and trace */
    var msg = "Added " + title + " to your playlist";
    console.log("%c   [echo] " + msg,
                "font-family: Courier New;");
    xmlHttp.open("PUT", "/api/user/" + uid + "/trace/" + msg, false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
};

app.controller("soundCloudController", function ($q, $scope, $location, $cookieStore, $modal) {
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
    	var title = $scope.query;
    	music = "";
    	if(title == undefined){
    		alert("Please Enter a Search Term");
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
            console.log("%c   [echo] Title: " + track.title,
                        "font-family: Courier New;");
            console.log("%c   [echo] URI: " + url,
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