$(document).ready(function () {
    $(".flipBox").click(function () {
        $(this).hide();
        $(".contentBox").slideDown(5000);
    });
});