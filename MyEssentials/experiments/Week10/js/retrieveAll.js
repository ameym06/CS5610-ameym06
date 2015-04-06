$(function () {
    $("#search").click(getMusicAndVideo);

    function getMusicAndVideo() {
        getSongs();
        getVideos();
    }

    function getVideos() {
        var query = $("#searchTerm").val();
        var request;
        
        request = gapi.client.youtube.search.list({
            part: 'snippet',
            maxResults: 20,
            q: query
        });
        request.execute(showResponse);
    }

    function showResponse(response) {

        $("#result1").empty();
        for (i = 0; i < response.items.length; i++) {
            embedVideo(response.items[i]);
        }
    }

    function embedVideo(response) {
        if (response.kind == "youtube#searchResult") {
            if (response.id.videoId != undefined) {
                document.getElementById('result1').innerHTML +=
                    "<div style='display: inline-block; width: 100%;'><p>" +
                    response.snippet.title + "</p></div>" +
                    "<iframe id='ytplayer' type='text/html' width='60%' height='300px' " +
                    "src='https://www.youtube.com/embed/" + response.id.videoId +
                    "' frameborder='0' accesskey></iframe></div>";

            }
        }

    }

    function getSongs() {
        var query = $("#searchTerm").val();
        count = 0;
        limit = 10;

        callSoundCloudApi(query, count, limit);
    }

    function callSoundCloudApi(query, count, limit) {
        SC.initialize({
            client_id: 'd524ae3a3c29de693e5050384202ab43'
        });
        SC.get('/tracks', { q: query }, embedAllSongs);
    }

    function embedAllSongs(tracks) {
        $("#result").empty();
        for (; count < limit; count++) {
            embedThisSong(tracks[count].uri);
        }
    }

    function embedThisSong(track) {
        SC.oEmbed(track, { auto_play: false }, function (returnObject) {
            $("#result2").append("<div class=\"container\" style=\"display: inline-block; width: 100%;\">"
                + "<div><p>" + returnObject.title + "</p></div><p>Listen</p>" + resizeFrame(returnObject.html) + "</div>");
        });
    }

    function resizeFrame(obj) {
        obj = obj.replace('height="400"', 'height="300" style="margin: 5px; min-width: 223px;"');
        obj = obj.replace('width="100%"', 'width="45%"');
        return obj;
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
    
