google.load("feeds", "1");

google.setOnLoadCallback(initialize);

function initialize() {
    var feed = new google.feeds.Feed("http://rss.cnn.com/rss/cnn_world.rss");
    feed.load(loadFeed);
}

function loadFeed(result) {
    if (!result.error) {
        var container = document.getElementById("displayContent");
        var html = "";
        for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            var title = entry.title;
            var description = entry.content;
            var link = entry.link;
            var pubDate = entry.publishedDate;

            html += "<a href='" + link + "' target=_blank>";
            html += title;
            html += "</a>";
            html += "<p class='pubdate'>" + pubDate + "</p>";
            html += "<p>" + description + "</p>";
            html += "<hr />";

            div.innerHTML = html
            container.appendChild(div);
        }
    }
}