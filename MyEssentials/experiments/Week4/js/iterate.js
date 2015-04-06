$(document).ready(function () {

    $("button").click(function () {
        var array = ["one", "two", "three", "four", "five"];
        var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };

        jQuery.each(array, function (i, value) {
            $("#" + value).text("This is " + value + ".");
            return value !== "three";
        });

        jQuery.each(obj, function (i, value) {
            $("#" + i).append(document.createTextNode(" Now iterating on: " + value));
        });
    });
});
