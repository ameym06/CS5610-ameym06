$(function () {
    $(".animateBtn").click(function () {
        var div = $(".contentBox");

        div.animate({ width: "400px" }, "slow");
        div.animate({ height: "400px" }, "slow");
        div.animate({ opacity: "0.5" }, "slow");
        div.animate({ fontSize: "6em" }, "slow");
        div.animate({ height: "500px" }, "slow");
        div.animate({ height: "150px" }, "slow");
        div.animate({ width: "300px" }, "slow");

        div.text("Gray");
    });
});