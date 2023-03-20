// OMDB API endpoint
var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";

// Firebase API endpoint
var firebaseApiUrl = "https://your_firebase_project_id_here.firebaseio.com/watchlist.json";

// Global variables
var $movieTitleInput = $("#movie-title");
var $searchForm = $("form");
var $movieDetails = $("#movie-details");
var $watchlistMovies = $("#watchlist-movies");

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

// Function to add movie to Firebase API
function addMovieToWatchlist(movie) {
    $.ajax({
        url: firebaseApiUrl,
        method: "POST",
        data: JSON.stringify(movie),
        success: function(response) {
            console.log("Movie added to watchlist!");
            displayWatchlist();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

// Function to retrieve watchlist movies from Firebase API
function getWatchlistMovies(callback) {
    $.ajax({
        url: firebaseApiUrl,
        method: "GET",
        dataType: "json",
        success: function(response) {
            callback(response);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

// Function to display watchlist movies in the UI
function displayWatchlist() {
    getWatchlistMovies(function(movies) {
        $watchlistMovies.empty();

        $.each(movies, function(key, movie) {
            var $poster = $("<img>").attr("src", movie.Poster)
                .attr("alt", movie.title);
            var $title = $("<h3>").text(movie.title);
            var $year = $("<p>").text("Year: " + movie.year);
            var $rating = $("<p>").text("Rating: " + movie.rating);
            var $genre = $("<p>").text("Genre: " + movie.genre);
            var $plot = $("<p>").text(movie.plot);
            var $removeButton = $("<button>").addClass("remove-movie").text("Remove");

            var $watchlistMovie = $("<li>").addClass("watchlist-movie").append($poster, $title, $year, $rating, $genre, $plot, $removeButton);
            $watchlistMovie.data("key", key);
            $watchlistMovies.append($watchlistMovie);
        });
    });
}

// Listen for remove button click
$watchlistMovies.on("click", ".remove-movie", function() {
    var movieKey = $(this).closest(".watchlist-movie").data("key");
    removeMovieFromWatchlist(movieKey);
});

// Function to remove movie from Firebase API
function removeMovieFromWatchlist(movieKey) {
    var firebaseDeleteUrl = "https://your_firebase_project_id_here.firebaseio.com/watchlist/" + movieKey + ".json";

    $.ajax({
        url: firebaseDeleteUrl,
        method: "DELETE",
        success: function(response) {
            console.log("Movie removed from watchlist!");
            displayWatchlist();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

// Initialize the application
function init() {
    displayWatchlist();
}

// Call the init function when the page is ready
$(document).ready(function() {
    init();
});