require("dotenv").config; 

var keys = require("./keys.js"); 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify); 

console.log("liri initialized"); 

// spotify.search({type: "track", query: "phoenix"}, function(err, data){ 
//     if (err) {
//         return console.log("spotify error " + err); 
//     }

//     console.log(data); 
// })

spotify
  .search({ type: 'track', query: 'Wilson' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });