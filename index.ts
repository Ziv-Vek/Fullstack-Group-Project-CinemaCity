const moviesAndCinemasManager: MoviesAndCinemasManager =
  new MoviesAndCinemasManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();

let movies: any[] = [];

// Fetch movie data from json -
fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
  })
  .catch((error) => {
    console.log(error);
  });

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    cinemas = data;
    setData("cinemaData", cinemas);
  })
  .catch((error) => {
    console.log(error);
  });

searchFieldsRenderer.populateMovies(getData("movieData"));
searchFieldsRenderer.populateLocations(getData("cinemaData"), true);
