app.controller("homeController",
    function ($scope, $location, $modal, $cookieStore, $anchorScroll) {
		$scope.access_token = $cookieStore.get('access_token');
        
        //Page Scrolling functionality
		$scope.scrollTo = function (id) {
			 $('html, body').stop().animate({
                scrollTop: $(id).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        }

        //redirect to Listen.html
        $scope.findSongs = function () {
            $location.path('/listen');
        }

        //redirect to Watch.html
        $scope.findVideos = function () {
            $location.path('/watch');
        }

        //redirect to Concerts.html
        $scope.findConcerts = function () {
            $location.path('/experience');
        }

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

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
        
        //Shortcut to view Profile
        $scope.viewProfile = function(){
        	$location.path('/profile');
        };
       

        /*Logout function*/
        $scope.logout = function () {
            $cookieStore.remove('access_token');
            $cookieStore.remove('uid');
            $scope.access_token = $cookieStore.get('access_token');
            $location.url($location.path('/'));
        };

        /*Signup click - Redirect to signup page*/
        $scope.signUp = function () {
            $location.path('/signup');
        };
        
        //redirect to Blog.html
        $scope.writeBlog = function(){
        	$location.path('/blog');
        }

    });