const queryString = window.location.search;
// Retrieve transferred movie data from the URL query parameter
const urlParams = new URLSearchParams(queryString);
const movieDataString = urlParams.get("data") as string;
const movieData: Movie = JSON.parse(decodeURIComponent(movieDataString));

// Call populateMoviePage to populate movie page elements with the transferred movie data
populateMoviePage(movieData);

const moviesAndCinemasManager: MoviesAndCinemasManager =
  new MoviesAndCinemasManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();

let moviePageManager: MoviePageManager;
let moviePageRenderer: MoviePageRenderer;

async function main() {
  let allCinemas: Cinema[] = await this.getData("cinemaData");
  let allMovies: Movie[] = await this.getData("movieData");

  this.moviePageRenderer = new MoviePageRenderer(movieData.uuid, allCinemas);
  this.moviePageManager = new MoviePageManager();

  searchFieldsRenderer.populateLocations(allCinemas, false);
}

main();
