function myController($scope, $http) {
    $scope.getMyResults =
        function () {
            var q = $scope.query;
            if (q == null || q == "") {
                document.getElementById("errordiv").innerHTML = "This field can't be left empty"
                document.getElementById("resmain").style.display = "none";
            }
            else {
                document.getElementById("errordiv").innerHTML = "";
                document.getElementById("resmain").style.display = "";
                $http.get("https://www.googleapis.com/youtube/v3/search?q=" + q + "&part=snippet&key=MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAOm6Yib9thJgO/Gf").success
                    (function (data, status) {
                        var idArray = [];
                        var idType = null;
                        var videoId = null;
                        for (var i = 0; i < data.items.length; i++) {
                            idType = data.items[i].id.kind;

                            if (idType == "youtube#video") {
                                videoId = data.items[i].id.videoId;
                                idArray.push("https://youtube.com/watch?v=" + videoId);
                                $scope.results = idArray;
                            }
                        }
                    });

            }


        }
}