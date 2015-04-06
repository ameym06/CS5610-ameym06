var EMBED_WALL_URL = './cooliris.swf';
window.cooliris.onEmbedInitialized = function () {
    cooliris.embed.setCallbacks({
        feedload: function (itemsLoaded) {
            log('[LOADED] ' + itemsLoaded + ' items');
        },
        feederror: function (error) {
            log('[LOAD-ERROR] ' + error);
        },
        select: function (item) {
            log("[SELECTED] " + JSON.stringify(item, null, 2));
        },
        deselect: function (item) {
            log("[DESELECTED] " + JSON.stringify(item, null, 2));
        }
    });
};

function embedWall(replaceElementId, feedUrl, width, height, useScripting) {
    swfobject.embedSWF(EMBED_WALL_URL,
                       replaceElementId,  // The ID of the HTML element to replace with the Embed Wall.
                       width,             // Width of the Flash content.
                       height,            // Height of the Flash content.
                       '9.0.0',           // Minimum supported version of Flash.
                       '',
                       { feed: feedUrl },
                       { AllowFullScreen: 'true', AllowScriptAccess: useScripting ? 'always' : 'never' });
}

embedWall('wall', 'api://www.flickr.com/?', 1300, 1200, true);
function setFeedUrl(url1) {
    console.log(url1);
    $.ajax(
        {
            url: url1,
            dataType: "jsonp",
            success: function (response) {
                console.log(response);
            }
        });

    cooliris.embed.setFeedURL(url1);
}