var x_step = 5;
var y_step = 5;
var height = $('#bounce_canvas').height() / 2;
var width = $('#bounce_canvas').width() / 2;
var ballheight = height / 4;
var ballwidth = width / 4;

$(document).ready(function () {
    setInterval(animate, 50);
});

function animate() {
    var canvas = $('#bounce_canvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width * 2, height * 2);
    $('#canvas-height').html(height);
    $('#canvas-width').html(width);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(ballwidth, ballheight, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    if (ballwidth < 0 || ballwidth > width) x_step = -x_step;
    if (ballheight < 0 || ballheight > height) y_step = -y_step;
    ballwidth += x_step;
    ballheight += y_step;
}