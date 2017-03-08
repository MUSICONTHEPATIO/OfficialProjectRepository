// FOURSQUARE 
// - 1. User inputs their location into "where are you" input field || clicks on the "Find where I am" button
// - 2. Make ajax request from foursqare to find patios near them based off of their location
// - 3. Return 5 patios. Display the name, address, price range, a photo, and a rating of the patio, and the restaurant/bar url

//SPOTIFY 
// - 1. User inputs their favourite artist into input field
// - 2. Ajax request from Spotify to generate a playlist. Display name of artist, the song, photo of artist, song duration. 

const dotp = {}

dotp.clientId = "HPIIHWSG4NJMA3IGF4H33WT0DQQDK5FLQWMZB4CFMUH422Q4";

dotp.clientSecret = "Q1FVDO1ISJGD32TFCAQQFSVTWS4SWNEW3AJK0NOU2SBH2WHH";

dotp.getPatios = function(){
	dotp.getPatiosNearMe = $.ajax({
		url: "http://api.foursquare.com/v2/venues/explore",
		method: "GET",
		dataType: "json",
		data: {
			near: userLocation,
			client_id: dotp.clientId,
			client_secret: dotp.clientSecret,
			v: "20150201",
			limit: ,
			query: patio,
			venuePhotos: 1,
		}
	})
	$.when
}







// twitter link

$(function() {
	$('.insert section').html(`<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Mash%20told%20me%20I'm%20going%20to%20have%20${kidResult}%20kid(s)%20with%20${loveResult}">Share your fortune on Twitter</a>`)
});


// smooth scroll

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

>>>>>>> 04a7fd487874543d721d17cc60ad3bb3d6b2999b:javascript/script.js
