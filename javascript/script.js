const dotpApp = {}

// below this is all the foursquare functionality

dotpApp.clientId = 'HPIIHWSG4NJMA3IGF4H33WT0DQQDK5FLQWMZB4CFMUH422Q4';
dotpApp.clientSecret = 'Q1FVDO1ISJGD32TFCAQQFSVTWS4SWNEW3AJK0NOU2SBH2WHH';


userInput = "";
$(".locationForm").on('submit', function(e){
	e.preventDefault();
	userInput = $("#userLocation").val();
	$("#userlocation").val("");
});

// AJAX request to get patio search results
dotpApp.getPatios = (userInput) => {
	$.ajax({
		url: "http://api.foursquare.com/v2/venues/explore",
		method: "GET",
		dataType: "json",
		data: {
			near: userInput,
			client_id: dotpApp.clientId,
			client_secret: dotpApp.clientSecret,
			v: "20150201",
			limit: 4,
			query: "patio",
			venuePhotos: 1
		},
		error() {
			$(".errorMessage").removeClass("invisible")
		},
		success() {
			$(".errorMessage").addClass("invisible")
		}

	// 1. Return data
	}).then((data) => {
			const objectsArray = data.response.groups[0].items;
			let venuesArray = [];

			objectsArray.forEach((object) => venuesArray.push(object.venue))

	//2.Turn returned data into an array
	// pass it into a new function
		dotpApp.displayInfo(venuesArray);

	});
}

dotpApp.displayInfo = (items) => {
	$('#patioResults').empty();

	var newArray = items.filter((results) => {
		return results.name + results.rating;
	})
	items.forEach((item) => {

		const foursquareVerified = item.verified
		const foursquareName = item.name;
		const foursquareRating = item.rating;
		const foursquareLocation = item.location.address + "," + " " + item.location.city + "," + " " + item.location.country;
		const foursquarePhone = item.contact.formattedPhone;
		const foursquarePrice = item.price.currency;
		const foursquareUrl = item.url;

		const foursquareNameElement = $('<h4>').addClass('venueName').text(foursquareName);
		const foursquareRatingElement = $('<p>').addClass('results__Content').text(`Rating: ` +foursquareRating + `/10`);
		const foursquareLocationElement = $('<p>').addClass('results__Content').text(foursquareLocation);
		const foursquarePhoneElement = $('<p>').addClass('results__Content').text(foursquarePhone);
		const foursquarePriceElement = $('<p>').addClass('results__Content').text(`Price: ` + foursquarePrice + `/$$$`);
		const foursquareUrlElement = $('<a href>').addClass('results__Content').text(foursquareUrl);
		const patioSuggestion = $('<div>').addClass('suggestedPatio').append(foursquareNameElement, foursquareRatingElement, foursquareLocationElement, foursquarePhoneElement, foursquarePriceElement, foursquareUrlElement);

            $(".patio").append(patioSuggestion);		
	})
};

// Below this line is all Spotify functionality
dotpApp.spotifyUrl = 'https://api.spotify.com/v1';
var spotifyArray = [];

dotpApp.spotifyEvents = function() {
	$('.musicForm').on('submit', function(e){
		e.preventDefault();
		$("input[type=search]").each(function() {
   			spotifyArray.push($(this).val());
			})
		let search = spotifyArray.map(artistName => dotpApp.searchArtist(artistName));
		dotpApp.getPatios(userInput);	

		$('html, body').animate({
	  	scrollTop: $("#resultsSection").offset().top
		}, 1000)

		dotpApp.retrieveArtistInfo(search);
	})
}

// Makes a request to get artist info from API
dotpApp.searchArtist = (artistName) => $.ajax({
	url: `${dotpApp.spotifyUrl}/search`,
	method: 'GET',
	dataType: 'json',
	data: {
		q: artistName,
		type: 'artist'
	},
	error() {
		$(".spotifyError").removeClass("invisible")
	},
	success() {
		$(".spotifyError").addClass("invisible")
	}
})


dotpApp.retrieveArtistInfo = function(search){
	$.when(...search)
		.then((...results) => {
				results = results.map(getFirstElement)
					.map((res) =>  res.artists.items[0].id)
					.map(id => dotpApp.getArtistAlbums(id));

					dotpApp.retrieveArtistTracks(results)
		})
}

// Makes an AJAX call to retrieve albums based on the artist's Spotify id
dotpApp.getArtistAlbums = (artistId) => $.ajax({
	url: `${dotpApp.spotifyUrl}/artists/${artistId}/albums`,
	method: 'GET',
	dataType: 'json',
	data: {
		album_type: 'album'
	}
})

// Gets artist's album ids and sends that info to the AJAX request
dotpApp.retrieveArtistTracks = function(artistAlbums) {
	$.when(...artistAlbums)
		.then((...albums) => {
			albumIds = albums.map(getFirstElement)
				.map(res => res.items)
				.reduce(flatten,[])
				.map(album => album.id)
				.map(ids => dotpApp.getArtistTracks(ids))
			dotpApp.buildPlaylist(albumIds); 
		});
}

// Makes the call to retrieve artist tracks based on id
dotpApp.getArtistTracks = (id) => $.ajax({
	url: `${dotpApp.spotifyUrl}/albums/${id}/tracks`,
	method: 'GET',
	dataType: 'json'
});

const getFirstElement = (item) => item[0];

const flatten = (prev,curr) => [...prev,...curr];

const getRandomTrack = (trackArray) => {
	const randoNum = Math.floor(Math.random() * trackArray.length)
	return trackArray[randoNum]
}

// Makes a playlist based on returned tracks and sends it to the page
dotpApp.buildPlaylist = (tracks) => {
	$.when(...tracks)
		.then((...trackResults) => {
			trackResults = trackResults.map(getFirstElement)
				.map(item => item.items)
				.reduce(flatten, [])
				.map(item => item.id);

			const randomTracks = [];
			for(let i = 0; i <= 30; i++) {
				randomTracks.push(getRandomTrack(trackResults));
			}
			randomTracks.join();
			const baseUrl = `https://embed.spotify.com/?theme=white&uri=spotify:trackset:Patio Party:${randomTracks.join()}`;

			$('.playlistElement').html(`<iframe src="${baseUrl}"></iframe>`)
			$('iframe').addClass('spotifyPlaylist')

		})
};

dotpApp.init = function(){

	dotpApp.spotifyEvents();
};


$(function() {
  dotpApp.init(); 

  // $(function() {
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
// });
});



