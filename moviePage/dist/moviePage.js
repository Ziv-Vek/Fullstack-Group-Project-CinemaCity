// MOVIE INFO FROM THE CLICKED MOVIE CARD :
// Retrieve transferred movie data from the URL query parameter
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var movieDataString = urlParams.get("data");
var movieData = JSON.parse(decodeURIComponent(movieDataString));
populateMoviePage(movieData);
////////////////////////////////////////////////////////////////////////////////////////
var moviesAndCinemasManager = new MoviesAndCinemasManager();
var searchFieldsRenderer = new SearchFieldsRenderer();
var searchHandler = new SearchHandler();
