$(function () {
    $("#search").click(getSongs);

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
            $("#result").append("<div class=\"container\" style=\"display: inline-block; width: 100%;\">"
                + "<div><p>" + returnObject.title + "</p></div><p>Listen</p>" + resizeFrame(returnObject.html) + "</div>");
        });
    }

    function resizeFrame(obj) {
        obj = obj.replace('height="400"', 'height="300" style="margin: 5px; min-width: 223px;"');
        obj = obj.replace('width="100%"', 'width="45%"');
        return obj;
    }

});
