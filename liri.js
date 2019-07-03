require("dotenv").config(); 

var keys = require("./keys"); 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify); 

var omdbKey = "trilogy"; 

var fs = require("fs"); 

var axios = require("axios");

var moment = require("moment"); 


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
  .search({ type: 'track', query: searchTerm, limit: 10})
  .then(function(response) {
    // console.log(response);
    // console.log("==========================")
    // console.log(response.tracks.items); 
    // console.log("==========================")
    console.log("=========== TRACK INFO ==============="); 
    console.log("Song Title: " + response.tracks.items[0].name + ", Track Number: " + response.tracks.items[0].track_number);
    console.log("Album: " + response.tracks.items[0].album.name); 
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Preview: " + response.tracks.items[0].preview_url); 
    console.log("=========== TRACK INFO ==============="); 
  })
  .catch(function(err) {
    console.log("no matching songs found");
  });
}

function omdbSearch (searchTerm){ 
  axios.get (`http://www.omdbapi.com/?t=${searchTerm}&apikey=${omdbKey}`)
  .then (
    function(response) {
      // console.log(response.data); 
      console.log("=========== MOVIE INFO ===============")
      console.log("The movie's title is: " + response.data.Title);
      console.log("The movie was released in: " + response.data.Year);
      console.log("IMDB rating: " + response.data.imdbRating);  
      console.log("Rotten Tomatoes rating : " + response.data.Ratings[0].Value);
      console.log("Produced in: " + response.data.Country); 
      console.log("Language: " + response.data.Language); 
      console.log("Plot: " + response.data.Plot); 
      console.log("Actors: " + response.data.Actors); 
      console.log("=========== MOVIE INFO ===============")
    }
  )


  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log("1" + error.response.data);
      console.log("---------------Status---------------");
      console.log("2" + error.response.status);
      console.log("---------------Status---------------");
      console.log("3" + error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("No movies match the entered search criteria. Please try again.");
  });


}

function concertSearch (searchTerm){ 
  axios.get(`https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`) 
  .then (
    function (response) {
      console.log(searchTerm); 
      // console.log(response.data); 
      console.log("=========== NEXT FIVE CONCERTS ===============")
      for (i=0; i < 5; i++) {
      // console.log(response.data); 
      console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY " + "h:mm A")); 
      console.log("Venue: " + response.data[i].venue.name); 
      console.log("Venue location: " + response.data[i].venue.city, response.data[i].venue.region, response.data[i].venue.country);
      console.log("----------------------------------------------")
      }
      console.log("=========== NEXT FIVE CONCERTS ===============")
    }
  )

  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log("1" + error.response.data);
      console.log("---------------Status---------------");
      console.log("2" + error.response.status);
      console.log("---------------Status---------------");
      console.log("3" + error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log("4" + error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("The list above shows the next five shows for " +searchTerm + ". If there are no shows listed, the artist is not currently touring.");
  });

}

function doThis () {
  fs.readFile("random.txt", "utf8", function (err, data){
    if (err) {
      return console.log("error"); 
    }
    // console.log(data); 

    var doThis = data.split(","); 
    searchTerm = doThis[1];
    // console.log(searchTerm);  

    spotify
    .search ({type: "track", query: searchTerm})
    .then (function(response) {
      // console.log(response); 
      console.log("=========== RICK ROLL ==============="); 
      console.log("Song Title: " + response.tracks.items[0].name + ", Track Number: " + response.tracks.items[0].track_number);
      console.log("Album: " + response.tracks.items[0].album.name); 
      console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
      console.log("Preview: " + response.tracks.items[0].preview_url); 
      console.log("=========== RICK ROLL ==============="); 
    }
    )
    
  })
}

  switch (command) {
    case "spotify": 
    // spotifySearch(searchTerm); 
    if (!searchTerm) {
      searchTerm = "The Sign Ace of Base";  
      spotifySearch(searchTerm); 
    }
    else {spotifySearch(searchTerm);}
    break; 

    case "movie":
    if (!searchTerm) {
      searchTerm = "Mr. Nobody"; 
      omdbSearch(searchTerm); 
    }
    else {omdbSearch(searchTerm)}; 
    break; 

    case "concert":
    if (!searchTerm) {
      searchTerm = "Tame Impala"; 
      concertSearch(searchTerm); 
    }
    else {concertSearch(searchTerm)}; 
    break; 

    case "do-this": 
    doThis(); 
    break; 

    default: 
    console.log("=========== WELCOME ==============="); 
    console.log("Welcome to LIRI! LIRI can help you find information about your favorites songs and movies, and will help you find concerts you want to attend.");
    console.log("To find a song, use the 'spotify' command."); 
    console.log("To find a movie, use the 'movie' command."); 
    console.log("To find a song, use the 'concert' command."); 
    console.log("Try the 'do-this' command for a random surprise!"); 
  }

  fs.appendFile("log.txt", searchTerm + "\r\n", function (err){
    if (err) {
      return console.log (err); 
    }
    console.log("log updated"); 
  })


