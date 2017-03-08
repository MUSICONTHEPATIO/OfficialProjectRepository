
// FOURSQUARE 
// - 1. User inputs their location into "where are you" input field || clicks on the "Find where I am" button
// - 2. Make ajax request from foursqare to find patios near them based off of their location
// - 3. Return 5 patios. Display the name, address, price range, a photo, and a rating of the patio, and the restaurant/bar url


//SPOTIFY 
// - 1. User inputs their favourite genre into input field
// - 2. Ajax request from Spotify to generate a playlist. Display name of artist, the song, photo of artist, song duration. 


var dotp.App {}

dotp.clientId = "HPIIHWSG4NJMA3IGF4H33WT0DQQDK5FLQWMZB4CFMUH422Q4";

dotp.clientSecret = "Q1FVDO1ISJGD32TFCAQQFSVTWS4SWNEW3AJK0NOU2SBH2WHH";

dotp.getPatios = function(){
	dotp.getPatiosNearMe = $.ajax({
		url: "http://api.foursquare.com/v2/venues/explore",
		method: "GET",
		dataType: "json",
		data: {
			near: userLocation,
			client_id: DOTP.clientId,
			client_secret: DOTP.clientSecret,
			v: "20150201",
			limit: ,
			query: patio,
			venuePhotos: 1,
		}
	})
	$.when

}



var dotp.App {}

dotp.clientId = "HPIIHWSG4NJMA3IGF4H33WT0DQQDK5FLQWMZB4CFMUH422Q4";

dotp.clientSecret = "Q1FVDO1ISJGD32TFCAQQFSVTWS4SWNEW3AJK0NOU2SBH2WHH";

dotp.getPatios = function(){
    dotp.getPatiosNearMe = $.ajax({
        url: "http://api.foursquare.com/v2/venues/explore",
        method: "GET",
        dataType: "json",
        data: {
            near: userLocation,
            client_id: DOTP.clientId,
            client_secret: DOTP.clientSecret,
            v: "20150201",
            limit: ,
            query: patio,
            venuePhotos: 1,
        }
    })
    $.when

}