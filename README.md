# LIRI
LIRI is a command line interface (CLI) app that helps users get more information about their favorite songs and movies, and find upcoming concerts for their favorite artists. 

LIRI uses basic javascript functions to search APIs and return the results, logging them out so users can view them. A simple Switch/Case statement handles the commands as the user enters them. Spotify keys are stored in the .env file, and this file is excluded from the repo to protect my privacy. 

## Video
[Click here to view a LIRI demo](https://embed.vidyard.com/share/Ct1gXwxqLqhpgtaSSh1wvt? "Named link title") 

## Technologies Used
* Node.js
* Javascript 
* NPM Packages 
    * node-spotify-api
    * moment 
    * axios
    * dotenv
* APIs 
    * Spotify - using my own private API key
    * Bands In Town - using Trilogy's API key 
    * Online Movie Database (OMDB) - using Trilogy's API key 

## Features 
* Users can run LIRI without specifying a command to get a list of commands available for use. 
* Users can enter `spotify` to search for a specific song. 
    * If no song is specified, LIRI pulls back a song of her choosing. 
* Users can enter `movie` to search for a specific movie. 
    * If no movie is specified, LIRI pulls back a movie of her choosing. 
* Users can enter `concert` to search for a list of concerts. By default, LIRI displays five (5) upcoming concerts. 
    * If no concert is specified, LIRI assumes who you want to see and lists their upcoming concerts. 
* Users can enter `do-this` and LIRI will pull back a surprise! 
* Search terms are written to the log.txt file each time a user searches. 

## My Role 
I was the sole developer on this project and was provided academic support from my TAs and Instructor when I got stuck. 