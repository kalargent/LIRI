require("dotenv").config(); 

var keys = require("./keys"); 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify); 

var omdbKey = "trilogy"; 

var axios = require("axios"); 


// spotify.search({type: "track", query: "phoenix"}, function(err, data){ 
//     if (err) {
//         return console.log("spotify error " + err); 
//     }

//     console.log(data); 
// })
var command = process.argv[2];
var searchTerm = process.argv[3]; 

function spotifySearch (searchTerm) {
spotify
  .search({ type: 'track', query: searchTerm, limit: 1 })
  .then(function(response) {
    console.log(response);
    console.log("==========================")
    console.log(response.tracks.items); 
    console.log("==========================")
    console.log(response.tracks.items[0].name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function omdbSearch (searchTerm){ 
  axios.get (`http://www.omdbapi.com/?t=${searchTerm}&apikey=${omdbKey}`)
  .then (
    function(response) {
      console.log("The movie's rating is: " + response.data.imdbRating);
    }
  )


  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


}


  switch (command) {
    case "spotify": 
    spotifySearch(searchTerm); 
    break; 

    case "movie": 
    omdbSearch(searchTerm); 
    break; 
  }


