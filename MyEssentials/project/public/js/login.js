app.controller("loginController", function ($scope, $modalInstance, $http, $cookieStore) {

   $scope.fail = false;
    /*Login click*/
    $scope.login = function (user) {
    	
    	 $http.post("/api/login", user)
         .success(function(res){
        	 var token = res.username+" loggedIn";
        	 $cookieStore.put('access_token',token);
             $cookieStore.put('uid', res.username);
             $modalInstance.close();
         })
         .error(function (response, status) {
                $scope.fail = true;
                $scope.failMessage = "Provide valid credentials";
                console.log(response);
            
        });
    };
        

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

   
});