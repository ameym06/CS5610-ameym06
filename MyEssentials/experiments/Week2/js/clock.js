speed = 1000
tid = 0;
function displayDate() {
    format.date.value = new Date();
    tid = window.setTimeout("displayDate()", speed);
}
function startTimer(df) {
    format = df
    tid = window.setTimeout("displayDate()", speed);
}
function cleartid() {
    window.clearTimeout(tid);
}