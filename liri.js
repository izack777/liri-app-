// to connect with other programs

var fs = require('fs');
var keys = require('./keys.js') 
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var liriArg = process.argv[2];



//switch and commands for liri check for index 2 if you don't find it send to the last message//

switch(liriArg){
	case "my-tweets":
		myTweets ();
		break;
	case "spotify-this-song":
		spotifyThisSong();
		break;
	case "movie-this": 
		movieThis(); 
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	
	default:
				console.log("What are you trying to do? Try again with: "  + "\r\n" + "my-tweets" + "\r\n" + "spotify-this-song" + "\r\n" + "movie-this" + "\r\n" + "do-what-it-says.");
		
};

//this is the twitter section 

function myTweets(){
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
  });

  var twitterUserName = procees.argv[3];

  		if (!twitterUserName){
			  tweeterUsername = "izack001";
		  }

		  params = {sreen_name: twitterUserName, count:20};

		  client.get('statuses/user_timeline',params, function(error, data, response){
			  if(!error){
				
				for (var i = 0; i < data.length; i++) {
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" +
					"------------------------------ " + i + " ------------------------------" + "\r\n";
  
					console.log(twitterResults);
					random(twitterResults);	  
					
					}
			  }
			  else{
				  console.log("ERROR");
				  return;
			  }
		  });

	
}

//this is the spotify function//


function spotifyThisSong(spotifySong) {
	var spotify = new Spotify({
  		id: keys.spotifyKey.client_id,
  		secret: keys.spotifyKey.client_secret
	});

	var spotifySong = process.argv[3];
	
	if(!spotifySong) {
		spotifySong = "The Sign";
	}

	params = spotifySong;

	spotify.search({ type: 'track', query: params }, function(err, data) {
    	if ( err ) {
       		console.log('Error occurred: ' + err);
        	return;
    	}
    	else {
    		// console.log(data);
    		var songInfo = data.tracks.items;

    		for (var i = 0; i < 5; i++) {
    			if (songInfo[i]!= undefined) {
    				var spotifyResults = 
    				"Artist: " + songInfo[i].artists[0].name + "\r\n" + 
    				"Song: " + songInfo[i].name + "\r\n" +
    				"Album: " + songInfo[i].album.name + "\r\n" +
    				"------------------------------ " + i + " ------------------------------" + "\r\n";
    				console.log(spotifyResults);
    				random(spotifyResults);

    			}
    		}
    	}
	});
}


// // // omdb section 

function movieThis(){

	var movie = process.argv[3];
		if(!movie){
			movie = 'Mr. Nobody.';
		}
	
	params = movie

	request("http://www.omdbapi.com/?apikey=" + keys.omdbKey.omdb_key + "&t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieObject = JSON.parse(body);
			// console.log(movieObject); 
			var movieResults =
			"------------------------------ begin ------------------------------" + "\r\n" +
			"Title: " + movieObject.Title+"\r\n"+
			"Year: " + movieObject.Year+"\r\n"+
			"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
			"Country: " + movieObject.Country+"\r\n"+
			"Language: " + movieObject.Language+"\r\n"+
			"Plot: " + movieObject.Plot+"\r\n"+
			"Actors: " + movieObject.Actors+"\r\n"+
			"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
			"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
			"------------------------------ finish ------------------------------" + "\r\n";
			console.log(movieResults);

			random(movieResults); 
		} 
		else {
			console.log("Error :"+ error);
			return;
		}
	});
};

