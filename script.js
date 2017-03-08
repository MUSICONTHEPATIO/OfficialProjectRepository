



//create init key
spotifyApp.init = function(){
}

// create spotify object and key variable
var spotifyApp = {}
spotifyApp.key = 'XXXXXX';

//create function to get information from spotify
spotifyApp.newMusic = function(song){
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        dataType: 'json',
        data: {
            url:
            q: "XXX",
            type: "playlist",
        }
    }).then(function(returnedSong) {
        const playArray = returnedSong.playlists.items;
        spotifyApp.displayInfo(playMusic);
    }); 
}

// share Spotify app with next function
spotifyApp.displayInfo = function(items) {

}


$(function(){
    spotifyApp.init();
})