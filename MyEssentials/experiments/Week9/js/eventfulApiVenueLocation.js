function getVenue() {
    var elem = document.getElementById('eventDetails');
    var currTxt = elem.innerHTML;

    var oArgs = {
        app_key: "QhNBcQmN6gTj3bwm",
        q: "music",
        where: "Boston",
        "date": "2014060500-2015062500",
        page_size: 5,
        sort_order: "popularity",
    };
    EVDB.API.call("/events/search", oArgs, function (oData) {
        elem.innerHTML = currTxt + " Venue: " + oData.events.event[0].venue_name;
    });
}