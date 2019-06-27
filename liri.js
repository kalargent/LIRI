require("dotenv").config(); 

var keys = require("./keys"); 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);   

// spotify.search({type: "track", query: "phoenix"}, function(err, data){ 
//     if (err) {
//         return console.log("spotify error " + err); 
//     }

//     console.log(data); 
// })

spotify
  .search({ type: 'track', query: 'Wilson', limit: 1 })
  .then(function(response) {
    console.log(response);
    console.log("==========================")
    console.log(response.tracks.items); 
    console.log("==========================")
    console.log(response.tracks.items.album);
  })
  .catch(function(err) {
    console.log(err);
  });