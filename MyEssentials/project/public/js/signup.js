app.controller("signUpController", function ($scope, $http, $location, $modal, $cookieStore) {
	$scope.access_token = $cookieStore.get('access_token');
	
	$('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    /*Logo Click*/
    $scope.goToHome = function () {
        $location.path('/');
    }

    /*Login click*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: './Login.html',
            controller: 'loginController'
        });

        modalInstance.result.then(function () {
            $location.path('/');
        });
        
    };
    
    $scope.signUp = function(user){
    	$http.post("/api/signup", user)
    	.success(function(res){
    		if(res.returnCode == 0){
    			$location.path('/');
        		alert("You are successfully registered. Try Log In!");
    		}
    		else
    			alert("Username / Email already taken. Try another");
    			
    	})
        .error(function (res) {
            console.log(res);
            alert(res);
        });
    	
    };
    
  //Shortcut to view Profile
    $scope.viewProfile = function(){
    	$location.path('/profile');
    };
});