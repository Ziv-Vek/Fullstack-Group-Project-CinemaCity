var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
        //moviesAndCinemasManager.addCinema(this);
    }
    return Cinema;
}());
var venue = /** @class */ (function () {
    function venue() {
        this.moviesList = [];
    }
    return venue;
}());
var Movie = /** @class */ (function () {
    function Movie(image, name, genre, ageLimit, premiere, screenDuration, description, trailerURL, cinemaID) {
        this.image = image;
        this.name = name;
        this.genre = genre;
        this.ageLimit = ageLimit;
        this.premiere = premiere;
        this.screenDuration = screenDuration;
        this.description = description;
        this.trailerURL = trailerURL;
        this.cinemaID = cinemaID;
        //moviesAndCinemasManager.addMovie(this);
    }
    return Movie;
}());
var MoviesAndCinemasManager = /** @class */ (function () {
    function MoviesAndCinemasManager() {
        this.movies = [];
    }
    Object.defineProperty(MoviesAndCinemasManager.prototype, "getCinemasArr", {
        get: function () {
            return this.cinemasArr;
        },
        enumerable: false,
        configurable: true
    });
    MoviesAndCinemasManager.prototype.setCinemasArr = function (data) {
        // console.log(data);
        // console.log(data[2].cinemaName);
        this.cinemasArr = data;
    };
    MoviesAndCinemasManager.prototype.addMovie = function (movie) {
        this.movies.push(movie);
    };
    return MoviesAndCinemasManager;
}());
//let cinemasArr: any;
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    if (data.length === 0)
        throw new Error("Data from cinema.json is empty");
    handleJsonCinemaData(data);
})["catch"](function (error) { return console.log(error); });
var handleJsonCinemaData = function (data) {
    if (!MoviesAndCinemasManager)
        throw new Error("MoviesAndCinemasManager not found.");
    //cinemasArr = data;
    moviesAndCinemasManager.setCinemasArr(data);
};
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
