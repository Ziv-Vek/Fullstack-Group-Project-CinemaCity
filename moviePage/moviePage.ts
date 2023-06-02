// MOVIE INFO FROM THE CLICKED MOVIE CARD :
// Retrieve transferred movie data from the URL query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieDataString = urlParams.get("data") as string;
const movieData: Movie = JSON.parse(decodeURIComponent(movieDataString));

populateMoviePage(movieData);
////////////////////////////////////////////////////////////////////////////////////////

const moviesAndCinemasManager: MoviesAndCinemasManager =
  new MoviesAndCinemasManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();
