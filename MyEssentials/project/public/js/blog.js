app.controller("blogController",
    function ($scope, $location, $modal, $cookieStore, $http) {
	//Access token required to check whether user is logged in or logged out
	$scope.access_token = $cookieStore.get('access_token');
	$scope.fail=false;
	$scope.success=false;


	//Redirection to Home Page
	$scope.goToHome = function(){
		$location.path('/');
	}
	
	//Username required for sending information to the Blog-View Page
	var uid = $cookieStore.get('uid');
	
	//Function to submit blogs
	$scope.submit = function(){
		$scope.fail=false;
		$scope.success=false;

		if($scope.title ==undefined || $scope.content == undefined
			|| $scope.title == "" || $scope.content == ""){
			$scope.fail=true;
			$scope.failMessage ="Please enter Blog Title and Content"; 
			return;
		}
		else{
			var blog={};
			blog.title=$scope.title;
			blog.content=$scope.content;
			blog.username=uid;
			blog.date = new Date();
			$http.post("/api/blog/", blog)
			.success(function(res){
				if(res.returnCode==0){
					$scope.title="";
					$scope.content="";
					$scope.success=true;
					$scope.successMessage="Successfully submitted your Blog. Go to MyProfile page to find your Blogs!";
				}
			})
			.error(function(res){
				$scope.fail=true;
				$scope.failMessage ="Failed to save your Blog. Please try again!"; 
			});
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