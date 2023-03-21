// // 1. OMDB API endpoint and Firebase API endpoint are being declared as global variables //

// var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";
// var firebaseApiUrl = "https://your_firebase_project_id_here.firebaseio.com/watchlist.json";

// // 2.  Global variables are declared for jQuery objects that reference elements in the HTML document.  These variables will be used later on in the code to manipulate the DOM. 

// var $movieTitleInput = $("#movie-title");
// var $searchForm = $("form");
// var $movieDetails = $("#movie-details");
// var $watchlistMovies = $("#watchlist-movies");

// // 3. A listener is added to the search form that listens for a form submission.  This code adds a listener to the form submit event, and when the form is submitted, it prevents the default behavior (which is to refresh the page), retrieves the movie title input value, and passes it as an argument to the `getMovieDetails()` function.

// $searchForm.on("submit", function(event) {
//     event.preventDefault();
//     var movieTitle = $movieTitleInput.val();
//     getMovieDetails(movieTitle);
// })

// // 4. The `getmovieDetails()` function takes the movie title as an argument and makes an AJAX request to the OMDB API.  

// function getMovieDetails (movieTitle) {
//     $.ajax 
// }

// OMDB API endpoint
var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";

// Global variables
var $movieTitleInput = $("#movie-title");
var $searchForm = $("form");
var $movieDetails = $("#movie-details");

// Listen for search form submission
$searchForm.on("submit", function(event) {
    event.preventDefault();
    var movieTitle = $movieTitleInput.val();
    getMovieDetails(movieTitle);
});

// Function to retrieve movie details from OMDB API
function getMovieDetails(movieTitle) {
    $.ajax({
        url: omdbApiUrl,
        method: "GET",
        dataType: "json",
        data: {
            t: movieTitle
        },
        success: function(response) {
            displayMovieDetails(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

// Function to display movie details in the UI
function displayMovieDetails(movie) {
    var $poster = $("<img>").attr("src", movie.Poster);
    var $title = $("<h3>").text(movie.Title);
    var $year = $("<p>").text("Year: " + movie.Year);
    var $rating = $("<p>").text("Rating: " + movie.imdbRating);
    var $genre = $("<p>").text("Genre: " + movie.Genre);
    var $plot = $("<p>").text(movie.Plot);
    var $addButton = $("<button>").addClass("add-movie").text("Add to Watchlist");

    $movieDetails.empty().append($poster, $title, $year, $rating, $genre, $plot, $addButton);
}

// Global variables
var $watchlistMovies = $("#watchlist-movies");

// Listen for add button click
$movieDetails.on("click", ".add-movie", function() {
    var movie = {
        title: $movieDetails.find("h3").text(),
        year: $movieDetails.find("p:contains('Year')").text().replace("Year: ", ""),
        rating: $movieDetails.find("p:contains('Rating')").text().replace("Rating: ", ""),
        genre: $movieDetails.find("p:contains('Genre')").text().replace("Genre: ", ""),
        plot: $movieDetails.find("p").last().text()
    };

    addMovieToWatchlist(movie);
});

// Function to add movie to local storage
function addMovieToWatchlist(movie) {
    var movies = JSON.parse(localStorage.getItem("watchlist")) || [];
    movies.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(movies));
    console.log("Movie added to watchlist!");
    displayWatchlist();
}

// Function to retrieve watchlist movies from local storage
function getWatchlistMovies() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

// Function to display watchlist movies in the UI
function displayWatchlist() {
    var movies = getWatchlistMovies();
    $watchlistMovies.empty();

    $.each(movies, function(index, movie) {
        var $poster = $("<img>").attr("src", movie.Poster)
            .attr("alt", movie.title);
        var $title = $("<h3>").text(movie.title);
        var $year = $("<p>").text("Year: " + movie.year);
        var $rating = $("<p>").text("Rating: " + movie.rating);
        var $genre = $("<p>").text("Genre: " + movie.genre);
        var $plot = $("<p>").text(movie.plot);
        var $removeButton = $("<button>").addClass("remove-movie").text("Remove");

        var $watchlistMovie = $("<li>").addClass("watchlist-movie").append($poster, $title, $year, $rating, $genre, $plot, $removeButton);
        $watchlistMovie.data("index", index);
        $watchlistMovies.append($watchlistMovie);
    });
}

// Listen for remove button click
$watchlistMovies.on("click", ".remove-movie", function() {
    var movieIndex = $(this).closest(".watchlist-movie").data("index");
    removeMovieFromWatchlist(movieIndex);
});

// Function to remove movie from local storage
function removeMovieFromWatchlist(movieIndex) {
    var movies = getWatchlistMovies();
    movies.splice(movieIndex, 1);
    localStorage.setItem("watchlist", JSON.stringify(movies));
    console.log("Movie removed from watchlist!");
    displayWatchlist();
}

// Initialize the application
function init() {
    displayWatchlist();
}

// Call the init function when the page is ready
$(document).ready(function() {
    init();
});