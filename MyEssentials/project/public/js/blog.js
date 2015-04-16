app.controller("blogController",
    function ($scope, $location, $modal, $cookieStore, $http) {
	//Access token required to check whether user is logged in or logged out
	$scope.access_token = $cookieStore.get('access_token');
	
	//Redirection to Home Page
	$scope.goToHome = function(){
		$location.path('/');
	}
	
	var uid = $cookieStore.get('uid');
	
	//Function to submit blogs
	$scope.submit = function(blog){
		blog.username=uid;
		blog.date = new Date();
		console.log(blog);
		console.log(uid);
		$http.post("/api/blog/", blog)
		.success(function(res){
			if(res.returnCode==0){
				$scope.blog.title="";
				$scope.blog.content="";
				alert("Successfully submitted your Blog!");
			}
		})
		
		.error(function(res){
			alert("Could not save your Blog. Please try again!");
		});
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