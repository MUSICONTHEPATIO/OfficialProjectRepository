LOCATION INPUT FIELD
- User inputs their location into "where are you" input field || clicks on the "Find where I am" button
- Make ajax request from foursuare to find patios near them based off of their location
- Return 5 patios. Display the name, address, price range, a photo, and a rating of the patio, and the restaurant/bar url

var DOTP.App {}

DOTP.clientId = "HPIIHWSG4NJMA3IGF4H33WT0DQQDK5FLQWMZB4CFMUH422Q4";

DOTP.clientSecret = "Q1FVDO1ISJGD32TFCAQQFSVTWS4SWNEW3AJK0NOU2SBH2WHH";

DOTP.getPatios = function(){
	DOTP.getPatiosNearMe = $.ajax({
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

// DOTP.getMusic = function(){
// 	DOTP.getMusicPlaylists = $.ajax({
// 		url: "",
// 		method: "GET",
// 		dataType: "json",
// 		data: {

// 		}
// 	})
// }

