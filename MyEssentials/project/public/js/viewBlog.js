app.controller("viewController",
    function ($scope, $location, $modal, $cookieStore, $http) {
	//Access token required to check whether user is logged in or logged out
	$scope.access_token = $cookieStore.get('access_token');
	$scope.title = $location.search().BlogTitle;
	$scope.content = $location.search().BlogContent;
	$scope.date = $location.search().BlogDate;
	//Redirection to Home Page
	$scope.goToHome = function(){
		$location.path('/');
	};	
	
	//Login function
	$scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: './Login.html',
            controller: 'loginController'
        });

        modalInstance.result.then(function () {
            $location.url($location.path('/'));
            $location.path('/');
        });
        
    };
    
    //Logout function
    $scope.logout = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('uid');
        $scope.access_token = $cookieStore.get('access_token');
        $location.url($location.path('/'));
        $location.path('/');
    };

    //Signup function
    $scope.signUp = function () {
        $location.url($location.path('/'));
        $location.path('/signup');
    };
    
  //Shortcut to view Profile
    $scope.viewProfile = function(){
        $location.url($location.path('/'));
    	$location.path('/profile');
    };
		
});