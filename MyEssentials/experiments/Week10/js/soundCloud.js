function playSomeSound(genre) {
    SC.get('/tracks', {
        genres: genre,
        bpm : {
            from: 100
        }
    }, function(tracks){
        var random = Math.floor(Math.random() * 49);
        console.log(tracks);
        SC.oEmbed(tracks[random].uri, {autoplay: true}, document.getElementById('target'));
    });
}

window.onload = function(){
    SC.initialize({
        client_id: 'd524ae3a3c29de693e5050384202ab43'
    });

    var MenuLinks = document.getElementsByClassName('genre');
    for(var i =0; i < MenuLinks.length; i++){
        var menuLink = MenuLinks[i];
        menuLink.onclick = function(e){
            e.preventDefault();
            playSomeSound(menuLink.innerHTML);
        }
    }
}