var moviesAndCinemasManager = new MoviesAndCinemasManager();
var searchFieldsRenderer = new SearchFieldsRenderer();
var searchHandler = new SearchHandler();
var movies = [];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
})["catch"](function (error) {
    console.log(error);
});
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    cinemas = data;
    setData("cinemaData", cinemas);
})["catch"](function (error) {
    console.log(error);
});
searchFieldsRenderer.populateMovies(getData("movieData"));
searchFieldsRenderer.populateLocations(getData("cinemaData"), true);
