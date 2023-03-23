// OMDB API endpoint
var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";

//Global variables
var $movieTitleInput = $("#movie-title");
var $searchForm = $("form");
var $movieDetails = $("#movie-details");

// Listen for search form submission
$searchForm.on("submit", function (event) {
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
      t: movieTitle,
    },
    success: function (response) {
      displayMovieDetails(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });

  // Fetch for Giphy API
  fetch('https://api.giphy.com/v1/gifs/random?api_key=Q4cEPAQg4xeKcVG1BKFhTzBI8Yc1ovqt&tag=' + movieTitle + '&rating=pg-13')
  .then(response => response.json())
  .then(data => {
    const gifUrl = data.data.images.original.url;
    const gifElement = document.getElementById('gif');
    gifElement.src = gifUrl;
  })
  .catch(error => console.error(error));
}

// Function to display movie details in the UI
function displayMovieDetails(movie) {
  var $poster = $("<img>").attr("src", movie.Poster);
  var $title = $("<h3>").text(movie.Title);
  var $year = $("<p>").text("Year: " + movie.Year);
  var $rating = $("<p>").text("Rating: " + movie.imdbRating);
  var $genre = $("<p>").text("Genre: " + movie.Genre);
  var $plot = $("<p>").text(movie.Plot);
  var $addButton = $("<button>").addClass("btn btn-success add-movie").text("Add to Watchlist");

  $movieDetails
    .empty()
    .append($poster, $title, $year, $rating, $genre, $plot, $addButton);
}

// Global variables
var $watchlistMovies = $("#watchlist-movies");

// Listen for add button click
$movieDetails.on("click", ".add-movie", function () {
  var movie = {
    title: $movieDetails.find("h3").text(),
    year: $movieDetails.find("p:contains('Year')").text().replace("Year: ", ""),
    rating: $movieDetails
      .find("p:contains('Rating')")
      .text()
      .replace("Rating: ", ""),
    genre: $movieDetails
      .find("p:contains('Genre')")
      .text()
      .replace("Genre: ", ""),
    plot: $movieDetails.find("p").last().text(),
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

  $.each(movies, function (index, movie) {
    var $title = $("<td class='title'>").text(movie.title);
    var $year = $("<td class='content'>").text("Year: " + movie.year);
    var $rating = $("<td class='content'>").text("Rating: " + movie.rating);
    var $genre = $("<td class='content'>").text("Genre: " + movie.genre);
    var $plot = $("<td class='content'>").text(movie.plot);
    var $removeButton = $("<button>").addClass("remove-movie").text("Remove");

    var $watchlistMovie = $("<tr>")
      .addClass("watchlist-movie")
      .append($title, $year, $rating, $genre, $plot, $removeButton);
    $watchlistMovie.data("index", index);
    $watchlistMovies.append($watchlistMovie);
  });
}

// Listen for remove button click
$watchlistMovies.on("click", ".remove-movie", function () {
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
$(document).ready(function () {
  init();
});