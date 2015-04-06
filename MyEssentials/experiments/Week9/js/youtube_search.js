
$(function () {
    $(".goBtn").click(function () {
        qVal = $(".queryBox").val();
        if (qVal != null && qVal != undefined && qVal != "") {
            search(qVal);
        } else
            alert("Please enter a search term!");
    });

    function search(query) {
        var request;
        
            request = gapi.client.youtube.search.list({
                part: 'snippet',
                maxResults: 20,
                q: query
            });
        request.execute(showResponse);
    }

    function showResponse(response) {

        $("#result").empty();
        for (i = 0; i < response.items.length; i++) {
            embedVideo(response.items[i]);
        }
    }

    function embedVideo(response) {
        if (response.kind == "youtube#searchResult") {
            if (response.id.videoId != undefined) {
                document.getElementById('result').innerHTML +=
                    "<div style='display: inline-block; width: 100%;'><p>" +
                    response.snippet.title + "</p></div>" +
                    "<iframe id='ytplayer' type='text/html' width='50%' height='300px' " +
                    "src='https://www.youtube.com/embed/" + response.id.videoId +
                    "' frameborder='0' accesskey></iframe></div>";

            }
        }

    }
  

});

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded
function onYouTubeApiLoad() {
    // This API key is intended for use only in on this website.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBoezGILRHFVWLBZWLMLIK0l8_anAViuc4');
}