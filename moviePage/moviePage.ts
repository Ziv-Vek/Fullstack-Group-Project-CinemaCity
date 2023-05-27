const queryString = window.location.search;
// Retrieve transferred movie data from the URL query parameter
const urlParams = new URLSearchParams(queryString);
const movieDataString = urlParams.get("data") as string;
const movieData: Movie = JSON.parse(decodeURIComponent(movieDataString));

// Call populateMoviePage to populate movie page elements with the transferred movie data
populateMoviePage(movieData);
