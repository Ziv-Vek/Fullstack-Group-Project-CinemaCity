var queryString = window.location.search;
// Retrieve transferred movie data from the URL query parameter
var urlParams = new URLSearchParams(queryString);
var movieDataString = urlParams.get("data");
var movieData = JSON.parse(decodeURIComponent(movieDataString));
// Call populateMoviePage to populate movie page elements with the transferred movie data
populateMoviePage(movieData);
