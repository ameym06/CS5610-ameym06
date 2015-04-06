$(document).ready(function () {
    var divStyle = 'background-color:gray; display: block; border-radius: 4px; height: 60px; font-weight: bold; color: white; padding: 2px; border-width: 2px; border-color: white; margin-top: 10px; margin-bottom: 10px;';
    var url = 'http://content.guardianapis.com/search?q=Lionel Messi&format=json&from-date=2013-01-01&show-tags=contributor&show-fields=all&show-refinements=all&api-key=pkcztdbthwfvd64t5ev32p35';

    $.getJSON(url, { format: "json" }).done(function (data) {
        $.each(data.response.results, function (i, doc) {
            var redirectUrl = doc.webUrl;
            var displayText = doc.webTitle;
            jQuery('<div/>', {
                class: 'result',
                style: divStyle,
                href: redirectUrl,
                title: doc.webUrl,
                rel: 'external',
                html: '<a target = "_blank" style="color: white;" href=' + redirectUrl + '>' + doc.webTitle + '</a>'
            }).appendTo('.showdiv');
        });
    });
});

