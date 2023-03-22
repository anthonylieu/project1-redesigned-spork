// 1a.  This code declares a variable called `omdbApiUrl` and assigns it as a string value of "https://www.omdbapi.com/?apikey=7c59bc3b".

// 1b.  The value of this variable is an API endpoint for the Open Movie Database (OMDB) that requries an API key to access.  This endpoint allows the application to send HTTP requests to the OMDB API and retrieve movie data based on the user's search query.

// 1c.  In summary, this code defines a variable that stores the API endpoint URL for the OMDB API with an API key, which the application will use to retrieve movie data.

// OMDB API endpoint
var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";

// 2a.  This code defines three global variables using the `var` keyword and jQuery selectors:

// - `$movieTitleInput`: This variable is assigned the value of the element with the ID "movie-title".  This element is an input field where the user enterse a movie title to search for.

// - `$searchForm`: This variable is assigned the value of the `form` element on the page.  This form is the search form that the user submits to search for a movie.

// - `$movieDetails`: This variable is assigned the value of the element with the ID "movie-details".  This element is likely a container element where the application will display the details of the selected movie.

// 2b.  By defining these variables at the global level, they can be accessed by any function in the script, allowing them to be used across multiple functions.

// 2c.  In summary, this code defines three global variables that store jQuery selectors for the movie title input field, the search form, and the container element for displaying movie details.

//Global variables
var $movieTitleInput = $("#movie-title");
var $searchForm = $("form");
var $movieDetails = $("#movie-details");

// 3a.  This code attaches an event listener to the `$searchForm` variable (which is a jQuery object representing the search form) that listens for the "submit" event.

// 3b.  When the user submits the search form, thje anonymous function passed to `.on()` is executed.

// 3c.  The first line of the function calls `event.preventDefault()` to prevent the default behavior of the form submission, which would cause the page to reload.

// 3d.  The second line of the functino retrieves the value of the `$movieTitleInput` variable (which is a jQuery object representing the movie title input field) using the `.val()` method, and assigns it to a variable called `movieTitle`.  This value represents the movie title that the user entered in the input field.

// 3e.  The third line of the function calls the `getMovieDetails()` function and passes the `movieTitle` variable as an argument.  This function sends an AJAX request to the OMDB API with the user's movie title search query and retrieves movie details from the API.

// 3f.  In summary, this code attaches an event listener to the search form that listens for a form submission event.  When the user submits the form, the function executes, preventing the default behavior of the form submission, retrieving the user's movie title search query from the input field, and calling the `getMovieDetails()` function to retrieve movie details from the OMDB API.

// Listen for search form submission
$searchForm.on("submit", function (event) {
  event.preventDefault();
  var movieTitle = $movieTitleInput.val();
  getMovieDetails(movieTitle);
});

// 4a.  This code defines a function called `getMovieDetails()` that accepts a single argument called `movieTitle`.  This function sends an AJAX request to the OMDB API to retrieve movie details based on the specified movie title.

// 4b.  The AJAX request is created using the jQuery `$.ajax()` method, which takes an object as an argument with various options for the AJAX request.  Here's a breakdown of the options:

// - `url`: This option specifies the URL of the API endpoint to send the request to.  The value of this option is stored in the `omdbApiUrl` variable, which was defined earlier in the script.

// - `method`: This option specifies the HTTP method to use for the request.  In this case, it is said to "GET", which is the method used to retrieve data from the API.

// - `dataType`: This option specifies the data type of the response from the API.  In this case, it is set to "json" to indicate that the response will be in JSON format.

// - `data`:  This option specifies any data to send along with the request.  In this case, it is an object with a single property called "t", which represents the movie title to search for.

// - `success`: This option is a callback function that is executed when the AJAX request is successful.  It takes a single argument, `response`, which represents the response data from the API.  In this case the `displayMovieDetails()` function is called and passed the `response` data as an argument to display the movie details in the UI.

// - `error`:  This option is a callback function that is executed when the AJAX request encounters an error.  It takes three arguments: `xhr`, `status`, and `error`, which represent the XHR object, the status of the error, and the error message, respectively.  In this case, the `console.log()` method is used to log the error message to the console.

// 4c.  In summary, this code defines a function that sends an AJAX request to the OMOD API to retrieve movie details based on a specified movie title.  When the request is successful, the response data is passed to the `displayMovieDetails()` function to display the movie details in the UI.  If the request encounters an error, the error message is logged to the console.

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
}

// 5a.  This code defines a function called `displayMovieDetails()` that accepts a single argument called `movie`.  This function is responsible for displaying the movie's details in the UI.

// 5b.  The function creates several jQuery objects to represent the various elements that make up the movie details display.  Here's a breakdown of the elements:

// - `$poster`: This jQuery object represents an `img` element that displays the movie poster.  It is created using the `$()` function and the `attr()` method to set the `src` attribute to the value of `movie.Poster`.

// - `$title`: This jQuery object represents an `h3` element that displays the movie title.  It is created using the `S()` function and the `text()` method to set the text content to the value of `movie.Title`.

// - `$year`: This jQuery object represents a `p` element that displays the movie rating.  It is created using the `$()` function and the `text()` method to set the text content to the string "Year: " concatenated with the value of `movie.Year`.

// - `$rating`: This jQuery object represents a `p` element that displays the movie rating.  It is created using the `$()` function and the `text()` method to set the text content to the string "Rating:" concatenated with the value of `movie.imdbRating`.

// - `$genre`: This jQuery object represents a `p` element that displays the movie genre.  It is created using the `$()` function and the `text()` method to set the text content to the string "Genre: " concatenated with the value of `movie.Genre`.

// - `$plot`: This jQuery object represents a `p` element that displays the movie plot.  It is created using the `$()` function and the `text()` method to set the text content to the value of `movie.Plot`.

// - `$addButton`: This jQuery object represents a `button` element that allows the user to add the movie to their watchlist.  It is created using the `$()` function and the `addClass()` and `text()` methods to add a CSS class and set the text content.

// 5c. The function then calls the `.empty()` method on the `$moviedDetails` variable (which is a jQuery object representing the movie details container) to remove any existing movie details, and then calls the `.append()` method to append the various movie details elements to the container.

// 5d.  In summary, this code defines a function that creates jQuery objects to represent the various elements that make up the movie details display, and the nappends those elements to the movie details container in the UI.

// Function to display movie details in the UI
function displayMovieDetails(movie) {
  var $poster = $("<img>").attr("src", movie.Poster);
  var $title = $("<h3>").text(movie.Title);
  var $year = $("<p>").text("Year: " + movie.Year);
  var $rating = $("<p>").text("Rating: " + movie.imdbRating);
  var $genre = $("<p>").text("Genre: " + movie.Genre);
  var $plot = $("<p>").text(movie.Plot);
  var $addButton = $("<button>").addClass("add-movie").text("Add to Watchlist");

  $movieDetails
    .empty()
    .append($poster, $title, $year, $rating, $genre, $plot, $addButton);
}

// 6a.  This line declares a global variable called `$watchlistMovies` and assigns it the value of an element with an ID of "watchlist-movies".

// 6b.  The `$()` function is used to create a jQuery object that represents the element with the ID "watchlist-movies".  This object can be used to manipulate or access the element in various ways, such as appending new elements, modifying its attributes or contents, or binding event handlers to it.

// 6c.  By assigning the jQuery object to a variable, it becomes easier to reference and manipulate thee element in other parts of the code, such as when adding or removing movies from the watchlist, or when displaying the watchlist itself.

// Global variables
var $watchlistMovies = $("#watchlist-movies");

// 7a.  This code listens for a click event on an "Add to Watchlist" button that is located inside the `$movieDetails` element.  When the button is clicked, an anonymous function is called that creates a new `movie` object.

// 7b. The `movie` object contains properties for the movie's title, year, rating, genre, and plot.  Each property value is retrieved from the `$movieDetails` element using jQuery's `.find()` method to lcoate specific elements containing the relevant movie data.

// 7c. The `.text()` method is used to retrieve the text content of each element, and the `.replace()` method is used to remove the text "Year:", "Rating: ", or "Genre:" from the respective property values.

// 7d. Once the `movie` object has been created, the `addMovieToWatchlist()` function is called with the `movie` object as its argument.  This function adds the `movie` object to a watchlist array that is stored in local storage, updates the local storage, and then updates the UI with the new watchlist data.

// 7e.  In summary, this code listens for the "Add to Watchlist" button click, retrieves the relevant movie data from the `$movieDetails` element, creates a new `movie` object, and adds it to the user's watchlist array.

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

// 8a. This code defines a function called `addMovieToWatchlist()` that takes a `movie` object as its argument.  The purpose of this function is to add the `movie` object to a user's watchlist, which is stored in local storage.

// 8b.  The first line of the function retrieves the user's current watchlist from local storage by calling `localStorage.getItem("watchlist")`.  Since the watchlist data is stored as a JSON string in local storage, the `JSON.parse()` method is used to convert the string back into a JavaScript object.

// 8c.  If there is no watchlist data in local storage (i.e. if the user has not added any movies to their watchlist yet), then the `|| []` syntax is used to create an empty array in case `localStorage.getItem("watchlist")` returns `null`.

// 8d.  The next line adds the `movie` object to the `movies` array by calling the `.push()` method.

// 8e.  The third line updates the watchlist data in local storage by calling `localStorage.setItem("watchlist", JSON.stringify(movies))`.  This converts the uplaoded `movies` array back into a JSON string and stores it in local storage.

// 8f.  The fourth line logs a message to the console indicating that the movie has been added to the watchlist.

// 8g.  Finally, the `displayWatchlist()` function is called to update the UI with the updated watchlist data.

// Function to add movie to local storage
function addMovieToWatchlist(movie) {
  var movies = JSON.parse(localStorage.getItem("watchlist")) || [];
  movies.push(movie);
  localStorage.setItem("watchlist", JSON.stringify(movies));
  console.log("Movie added to watchlist!");
  displayWatchlist();
}

// 9a.  This code defines a function called `getWatchlistMovies()` that retrieves the user's watchlist from local storage and returns it as an array.

// 9b.  The function first calls `localStorage.getItem("watchlist")` to retrieve the current watchlist data from the local storage.  Since the watchlist data is stored as JSON string in local storage, the `JSON.parse()` method is used to convert the string back into a JavaScript object.

// 9c.  If there is no watchlist data in local storage (i.e., if the user has not added any movies to their watchlist yet), then the `|| []` syntax is used to return an empty array, in case `localStorage.getItem("watchlist")` returns `null`.

// 9d. The function then returns the watchlist data as an array, which can be used to display the user's saved movies in the UI.

// 9e.  In summary, this function retrieves the user's watchlist from local storage and returns it as an array.

// Function to retrieve watchlist movies from local storage
function getWatchlistMovies() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

// 10a.  This code defines a function called `displayWatchlist()` that displays the user's watchlist in the UI.

// 10b.  The first line of the function calls the `getWatchlistMovies()` function to retrieves the user's watchlist from local storage and assigns it to the `movies` variable.

// 10c.  The second line of the function empties the `$watchlistMovies` element, which is where the watchlist data will be displayed in the UI.

// 10d.  The next few lines of code loop through each `movie` object, the code creates HTML elements to display the movie data in the UI.

// - `poster` is an `<img>` element that displays the movie poster image.  It is created using jQuery's `$()` method and the `.attr()` method to set the `src` and `alt` attributes of the image.

// - `title` is an `<h3>` element that displays the movie title.  It is created using jQuery's `$()` method and the `.text()` method to set the text content of the element.

// - `$year`, `$rating`, and `$genre` are `<p>` elements that display the movie's year, rating, and genre, respectively.  They are created using jQuery's `$()` method and the `.text()` method to set the text content of each element.

// - `$plot` is a `<p>` element that displays the movie's plot summary.  It is created using jQuery's `$()` method and the `.text()` method to set the text content of the element.

// - `$removeButton` is a `<button>` element with the class "remove-movie" and the text "Remove."  It is created using jQuery's `$()` method and the `.addClass()` and `.text()` methods.

// 10e.  The next line of code creates a new `<li>` element with the class "watchlist-movie" and appends all of the above HTML elements to it using the `.append()` method.

// 10f.  The line `$watchlistMovies.data("index", index)` stores the index of the current movie in the `data` attribute of the `$watchlistMovie` element.  This will be used later to determine which movie to remove from the watchlist if the user clicks the "Remove" button.

// 10g.  Finally the completed `$watchlistMovie` element is appended to the `$watchlistMovies` element in the UI.

// 10h. In summary, this function retrieves the user's watchlist from local storage, empties the `$watchlistMovies` element in the UI, and the ncreates and appends HTML elements for each movie in the watchlist to the`watchlistMovies` element.  The function also stores the index of each movie in the `data` attribute of its corresponding HTML element, so that it can be used later to remove the movie from the watchlist.

// Function to display watchlist movies in the UI
function displayWatchlist() {
  var movies = getWatchlistMovies();
  $watchlistMovies.empty();

  $.each(movies, function (index, movie) {
    var $title = $("<h3>").text(movie.title);
    var $year = $("<p>").text("Year: " + movie.year);
    var $rating = $("<p>").text("Rating: " + movie.rating);
    var $genre = $("<p>").text("Genre: " + movie.genre);
    var $plot = $("<p>").text(movie.plot);
    var $removeButton = $("<button>").addClass("remove-movie").text("Remove");

    var $watchlistMovie = $("<li>")
      .addClass("watchlist-movie")
      .append($title, $year, $rating, $genre, $plot, $removeButton);
    $watchlistMovie.data("index", index);
    $watchlistMovies.append($watchlistMovie);
  });
}

// 11a.  This code listens for a click event on a "Remove" button that is located inside the `$watchlistMovies` element.  When the button is clicked, an anonymous function is called tha tremoves the corresponding movie from the user's watchlist.

// 11b.  The first line of the function uses jQuery's `.closest()` method to find the closest ancestor element of the clicked button with the class "watchlist-movie".  This ancestor element is the `<li>` element that contains all of the movie data in the UI.

// 11c.  The line `.data("index)")` retrieves the value of the `data-index` attribute that was previously stored on the `<li>` element when it was created by the `displayWatchlist()` function.  This value represents the index of the movie in the user's watchlist array.

// 11d.  The index value is then passed as an argument to the `removeMovieFromWatchlist()` function, which removes the movie from the user's watchlist array, updates local storage with the new watchlist data, and then updates the UI to remove the movie from the display.

// 11e.  In summary, this code listens for a "Remove" button click, retrieves the index of the corresponding movie in the user's watchlist array from the `data-index` attribute of the `<li>` element, and then removes the movie from the watchlist using the `removeMovieFromWatchlist()` function.

// Listen for remove button click
$watchlistMovies.on("click", ".remove-movie", function () {
  var movieIndex = $(this).closest(".watchlist-movie").data("index");
  removeMovieFromWatchlist(movieIndex);
});

// 12a.  This code defines a function called `removeMovieFromWatchlist()` that removes a movie from the user's watchlist in local storage.

// 12b.  The function takes a single argument, `movieIndex`, which represents the index of the movie to be removed from the watchlist.

// 12c.  The first line of the function retrieves the user's current watchlist from local storage by calling the `getWatchlistMovies()` function.

// 12d.  The second line of the function uses the `.splice()` method to remove the movie object at the spcified `movieIndex` from the `movies` array.

// 12e.  The third line of the function updates the watchlist data in local storage by calling `localStorage.setItem("watchlist", JSON.stringify(movies))`.  This converts the updated `movies` array back into a JSON string and stores it in local storage.

// 12f.  The fourth line logs a message to the console indicating that the movie has been removed from the watchlist.

// 12g.  Finally, the `displayWatchlist()` function is called to update the UI with the updated watchlist data.

// 12h.  In summary, this function removes a movie from the user's watchlist in local storage by first retrieving the current watchlist, removing the specified movie object from the array, updating local storage with the new watchlist data, logging a message to the console, and then updating the UI to reflect the changes.

// Function to remove movie from local storage
function removeMovieFromWatchlist(movieIndex) {
  var movies = getWatchlistMovies();
  movies.splice(movieIndex, 1);
  localStorage.setItem("watchlist", JSON.stringify(movies));
  console.log("Movie removed from watchlist!");
  displayWatchlist();
}

// 13a.  This code defines a function called `init()` that initializes the application by calling the `displayWatchlist()` function.

// 13b.  The `displayWatchlist()` function is responsible for retrieving the user's watchlist from local storage and displaying it in the UI.

// 13c.  By calling `displayWatchlist()` within the `init()` function, the user's watchlist will be displayed in the UI when the application first loads.

// 13d.  This function is later called when the document is ready by the following code:

// $(document).ready(function() {
//     init();
// });

// 13e.  In summary, the `init()` function initializes the application by calling the `displayWatchlist()` function, which retrieves the user's watchlist from local storage and displays it in the UI.  The `init()` function is called when the document is ready to ensure that the watchlist is displayed as soon as the page loads.

// Initialize the application
function init() {
  displayWatchlist();
}

// 14a. This code attaches an event listener to the `document` object that listens for the "DOMContentLoaded" event, which indicates that the HTML document has been completely loaded and parsed.

// 14b.  When the "DOMContentLoaded" event is fired, the anonymous function passed to `$(document).ready()` is called.  This function calls the `init()` function, which initializes the application by displaying the user's watchlist in the UI.

// 14c. In summary, this code waits for the HTML document to be completely loaded and parsed, and then calls the `init()` function to initialize the application by displaying the user's watchlist in the UI.

// Call the init function when the page is ready
$(document).ready(function () {
  init();
});

// // OMDB API endpoint
// var omdbApiUrl = "https://www.omdbapi.com/?apikey=7c59bc3b";

// // Global variables
// var $movieTitleInput = $("#movie-title");
// var $searchForm = $("form");
// var $movieDetails = $("#movie-details");

// // Listen for search form submission
// $searchForm.on("submit", function(event) {
//     event.preventDefault();
//     var movieTitle = $movieTitleInput.val();
//     getMovieDetails(movieTitle);
// });

// // Function to retrieve movie details from OMDB API
// function getMovieDetails(movieTitle) {
//     $.ajax({
//         url: omdbApiUrl,
//         method: "GET",
//         dataType: "json",
//         data: {
//             t: movieTitle
//         },
//         success: function(response) {
//             displayMovieDetails(response);
//         },
//         error: function(xhr, status, error) {
//             console.log(error);
//         }
//     });
// }

// // Function to display movie details in the UI
// function displayMovieDetails(movie) {
//     var $poster = $("<img>").attr("src", movie.Poster);
//     var $title = $("<h3>").text(movie.Title);
//     var $year = $("<p>").text("Year: " + movie.Year);
//     var $rating = $("<p>").text("Rating: " + movie.imdbRating);
//     var $genre = $("<p>").text("Genre: " + movie.Genre);
//     var $plot = $("<p>").text(movie.Plot);
//     var $addButton = $("<button>").addClass("add-movie").text("Add to Watchlist");

//     $movieDetails.empty().append($poster, $title, $year, $rating, $genre, $plot, $addButton);
// }

// // Global variables
// var $watchlistMovies = $("#watchlist-movies");

// // Listen for add button click
// $movieDetails.on("click", ".add-movie", function() {
//     var movie = {
//         title: $movieDetails.find("h3").text(),
//         year: $movieDetails.find("p:contains('Year')").text().replace("Year: ", ""),
//         rating: $movieDetails.find("p:contains('Rating')").text().replace("Rating: ", ""),
//         genre: $movieDetails.find("p:contains('Genre')").text().replace("Genre: ", ""),
//         plot: $movieDetails.find("p").last().text()
//     };

//     addMovieToWatchlist(movie);
// });

// // Function to add movie to local storage
// function addMovieToWatchlist(movie) {
//     var movies = JSON.parse(localStorage.getItem("watchlist")) || [];
//     movies.push(movie);
//     localStorage.setItem("watchlist", JSON.stringify(movies));
//     console.log("Movie added to watchlist!");
//     displayWatchlist();
// }

// // Function to retrieve watchlist movies from local storage
// function getWatchlistMovies() {
//     return JSON.parse(localStorage.getItem("watchlist")) || [];
// }

// // Function to display watchlist movies in the UI
// function displayWatchlist() {
//     var movies = getWatchlistMovies();
//     $watchlistMovies.empty();

//     $.each(movies, function(index, movie) {
//         var $poster = $("<img>").attr("src", movie.Poster)
//             .attr("alt", movie.title);
//         var $title = $("<h3>").text(movie.title);
//         var $year = $("<p>").text("Year: " + movie.year);
//         var $rating = $("<p>").text("Rating: " + movie.rating);
//         var $genre = $("<p>").text("Genre: " + movie.genre);
//         var $plot = $("<p>").text(movie.plot);
//         var $removeButton = $("<button>").addClass("remove-movie").text("Remove");

//         var $watchlistMovie = $("<li>").addClass("watchlist-movie").append($poster, $title, $year, $rating, $genre, $plot, $removeButton);
//         $watchlistMovie.data("index", index);
//         $watchlistMovies.append($watchlistMovie);
//     });
// }

// // Listen for remove button click
// $watchlistMovies.on("click", ".remove-movie", function() {
//     var movieIndex = $(this).closest(".watchlist-movie").data("index");
//     removeMovieFromWatchlist(movieIndex);
// });

// // Function to remove movie from local storage
// function removeMovieFromWatchlist(movieIndex) {
//     var movies = getWatchlistMovies();
//     movies.splice(movieIndex, 1);
//     localStorage.setItem("watchlist", JSON.stringify(movies));
//     console.log("Movie removed from watchlist!");
//     displayWatchlist();
// }

// // Initialize the application
// function init() {
//     displayWatchlist();
// }

// // Call the init function when the page is ready
// $(document).ready(function() {
//     init();
// });
