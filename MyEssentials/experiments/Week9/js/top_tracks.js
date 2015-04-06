

$(function () {

    $(".goBtn").click(function () {
        getTopTracks();
    });

});


function getTopTracks() {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/",
        data: {
            "method": "chart.gettoptracks",
            "api_key": "e0531d271ba5cf86a8fa53ff95ee2e48",
            "format": "json"
        },
        dataType: "json",
        success: function (response) {
            displayResults(response);
        }
    });
}

function displayResults(response) {
    var myTracks = response.tracks.track;
    if (myTracks == undefined) {
        $("#results").html("Track list could not be retrieved. Please try again.");
        return;
    }
    $("#results").empty();

    for (i = 0; i < myTracks.length ; i++) {
        $("#results").append("<div class='resultEntry' id='result" + (i + 1) + "'></div>");
        $("#result" + (i + 1)).append("<a class='topList' href='" + myTracks[i].url + "' target='_blank'><b>" + myTracks[i].name + "</b></a>");
    }

}