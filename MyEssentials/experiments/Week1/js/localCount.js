function counter() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.count)
            sessionStorage.count = Number(sessionStorage.count) + 1;
        else
            sessionStorage.count = 1;

        document.getElementById("value").innerHTML = "You have clicked the button " + sessionStorage.count + " time(s) in this session.";
    }
    else
        document.getElementById("value").innerHTML = "Sorry, your browser does not support web storage...";
}