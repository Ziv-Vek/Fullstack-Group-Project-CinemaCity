const moviesAndCinemasManager: MoviesAndCinemasManager =
  new MoviesAndCinemasManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();

let movies: any[] = [];
let cinemas: any[] = [];

// Fetch movie data from json -
fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
    searchFieldsRenderer.populateMovies(data);
  })
  .catch((error) => {
    console.log(error);
  });

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    cinemas = data;
    setData("cinemaData", cinemas);
    searchFieldsRenderer.populateLocations(data);
  })
  .catch((error) => {
    console.log(error);
  });
