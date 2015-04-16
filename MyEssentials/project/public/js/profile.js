app.controller("profileController",
    function ($scope, $location, $modal, $cookieStore, $http) {
	$scope.access_token = $cookieStore.get('access_token');
		
	var userBlogs=[];
	
	$scope.goToHome = function(){
			$location.path('/');
	};
	uid = $cookieStore.get('uid');
	/*
	$scope.getAllBlogs = function(){
		$http.get("/api/profile"+uid)
		.success(function(res){
			populateBlogs(res);
		});
	};
	
	function populateBlogs(res){
		
	};
	*/
	
	$scope.getAllBlogs = function(){
		$http.get("/api/profile/"+uid)
		.success(function(res){
			populateBlogs(res);
		});
	};
	
	function populateBlogs(res){
		len = res.length;
		console.log(len)
		for(var i = 0; i < len; i++)
		{
			var blog = res[i];
			var temp = {title:blog.title,content:blog.content,date:blog.date};
			console.log(temp);
			userBlogs.push(temp);
		}
		$scope.blogs = userBlogs;
	};
	
	$scope.openBlog = function(blog){
		$location.search('BlogTitle', blog.title);
		$location.search('BlogContent', blog.content);
		$location.search('BlogDate', blog.date);
		$location.path('/viewblog');
	};
	$scope.getAllBlogs();
		
    });