var moviesAndCinemasManager = new MoviesAndCinemasManager();
var searchFieldsRenderer = new SearchFieldsRenderer();
var searchHandler = new SearchHandler();
var movies = [];
var cinemas = [];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
    searchFieldsRenderer.populateMovies(data);
})["catch"](function (error) {
    console.log(error);
});
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    cinemas = data;
    setData("cinemaData", cinemas);
    searchFieldsRenderer.populateLocations(data);
})["catch"](function (error) {
    console.log(error);
});
