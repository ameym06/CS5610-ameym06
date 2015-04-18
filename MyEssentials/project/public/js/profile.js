app.controller("profileController",
    function ($scope, $location, $modal, $cookieStore, $http) {
	$scope.access_token = $cookieStore.get('access_token');

	var userBlogs=[];
	

	//redirect to Login.html
        $scope.login = function () {
            var modalInstance = $modal.open({
                templateUrl: './Login.html',
                controller: 'loginController'
            });

            
            modalInstance.result.then(function () {
                $scope.access_token = $cookieStore.get('access_token');
            });
        };

     /*Signup click - Redirect to signup page*/
        $scope.signUp = function () {
            $location.path('/signup');
        };

	//function to redirect to Home Page
	$scope.goToHome = function(){
			$location.path('/');
	};

	//Username required for sending information to the Blog-View page
	uid = $cookieStore.get('uid');
	
	//function to fetch all the Blogs of a particular user
	$scope.getAllBlogs = function(){
		$http.get("/api/profile/"+uid)
		.success(function(res){
			populateBlogs(res);
		})
		.error(function(res){
			console.log("Could not fetch the Blogs");
			console.log("Server Response: "+res);
		});
	};
	
	function populateBlogs(res){
		len = res.length;
		console.log("Total blogs of the user: "+len);
		for(var i = 0; i < len; i++)
		{
			var blog = res[i];
			var temp = {title:blog.title,content:blog.content,date:blog.date};
			userBlogs.push(temp);
		}
		$scope.blogs = userBlogs;
	};

	//function to write blogs
	//redirects to the Blog.html
	$scope.writeBlog = function(){
		$location.path('/blog');
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
	
	//function to open the Blog for detailed view
	//redirects to the Blog-View page
	$scope.openBlog = function(blog){
		$location.search('BlogTitle', blog.title);
		$location.search('BlogContent', blog.content);
		$location.search('BlogDate', blog.date);
		$location.path('/viewblog');
	};
	//call the function of the page load
	$scope.getAllBlogs();
		
    });