app.controller("signUpController", function ($scope, $http, $location, $modal, $cookieStore) {
	$scope.access_token = $cookieStore.get('access_token');
	
	$('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    $scope.fail=false;
    $scope.success=false;

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
    
    //SignUp function
    $scope.signUp = function(){

        var isValid = validate();
        if(isValid == true){
            $scope.fail = false;
            $scope.success = false;

            var user={};
            user.firstName=$scope.firstName;
            user.lastName=$scope.lastName;
            user.username=$scope.username;
            user.password=$scope.password;

            $http.post("/api/signup", user)
            .success(function(res){
                if(res.returnCode == 0){
                    $scope.success = true;
                    $scope.successMessage = "Successfully registered. Try Log In!"
                    console.log(response);
                }
                else{
                    $scope.fail = true;
                    $scope.failMessage = "Username already taken. Please try another Username / Email";
                }
                    
            })
            .error(function (response, status) {
                    $scope.fail = true;
                    $scope.failMessage = "There was a problem while registering. Please try again";
                    console.log(response);
                
            }); 
        }
        
    	
    };

    //Validation function before Signing up
    function validate(){
        /* Validation */
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if ($scope.firstName == undefined || $scope.firstName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide First Name";
            return false;
        } 
        else if ($scope.lastName == undefined || $scope.lastName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide Last Name";
            return false;
        }
        else if ($scope.username == undefined || $scope.username == "" || !emailFilter.test($scope.username) || $scope.username.match(illegalChars)) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid email address";
            return false;
        } 
        else if ($scope.password == "" || $scope.password == undefined || $scope.password.length < 6) {
            $scope.fail = true;
            $scope.failMessage = "Password must be atleast 6 characters long";
            return false;
        }
        return true; 
    };
    
  //Shortcut to view Profile
    $scope.viewProfile = function(){
    	$location.path('/profile');
    };
});