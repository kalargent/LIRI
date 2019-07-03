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
    var data = response.tracks.items[0]; 
    var song = [`
      Title: ${data.name},
      Album: ${data.album.name},
      Artist: ${data.artists[0].name} , 
      Preview: ${data.preview_url}
    `  
    ].join("/n/r"); 
    console.log("=========== TRACK INFO ==============="); 
    console.log(song); 
    console.log("=========== TRACK INFO ==============="); 
    logging(song); 
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
      var movieData = response.data; 
      var movieInfo = [`
        Title: ${movieData.Title},
        Year: ${movieData.Year},
        IMDB Rating: ${movieData.imdbRating}, 
        Rotten Tomatoes Rating: ${movieData.Ratings[0].Value}, 
        Produced in: ${movieData.Country}, 
        Language(s): ${movieData.Language}, 
        Plot: ${movieData.Plot}, 
        Actors: ${movieData.Actors}
        `
        
      ].join("/r/n"); 

      console.log("=========== MOVIE INFO ===============")
      console.log(movieInfo); 
      logging(movieInfo); 
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
      var concertData = response.data[i]
      var concerts = [`
        Date: ${moment(concertData.datetime).format("MM/DD/YYYY " + "h:mm A")}, 
        Venue: ${concertData.venue.name}, 
        City: ${concertData.venue.city}, 
        Region: ${concertData.venue.region},
        Country: ${concertData.venue.country},
      `].join("/r/n"); 
      console.log(concerts); 
      logging(concerts); 
      // console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY " + "h:mm A")); 
      // console.log("Venue: " + response.data[i].venue.name); 
      // console.log("Venue location: " + response.data[i].venue.city, response.data[i].venue.region, response.data[i].venue.country);
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
      var doThis = response.tracks.items[0]; 
      var doThisInfo = [`
        Title: ${doThis.name}, 
        Track: ${doThis.track_number},
        Album: ${doThis.album.name}, 
        Artist: ${doThis.artists[0].name}, 
        Preview: ${doThis.preview_url} 
      `].join("/r/n")

      console.log("=========== RICK ROLL ==============="); 
      console.log (doThisInfo); 
      logging(doThisInfo);
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

  function logging (logItem){
  fs.appendFile("log.txt", logItem+ "\r\n", function (err){
    if (err) {
      return console.log (err); 
    }
    // console.log("log updated"); 
  })
}


