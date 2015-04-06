var app = angular.module("WeatherApplication", []);
app.controller("WeatherController", function ($scope, $http) {
   
    $scope.query = function () {
        if (!$scope.cityName) {
            return;
        }
    $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.cityName)
        .success(function (response) {
    
        $scope.name = response.name;
        $scope.dt = new Date();
        $scope.time = $scope.dt.getHours() + ":" +
                                $scope.dt.getMinutes();
        $scope.weatherMain = response.weather[0].main;
        $scope.temp = response.main.temp - 273.15;
        $scope.windSpeed = response.wind.speed;
    });
}
});