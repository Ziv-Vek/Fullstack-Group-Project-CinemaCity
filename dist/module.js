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
        this.cinemasArr = [];
        this.populateCinemas();
    }
    Object.defineProperty(MoviesAndCinemasManager.prototype, "getCinemasArr", {
        get: function () {
            return this.cinemasArr;
        },
        enumerable: false,
        configurable: true
    });
    MoviesAndCinemasManager.prototype.addMovie = function (movie) {
        this.movies.push(movie);
    };
    // public get getMoviesArr(): Movie[] {
    //   return this.movies;
    // }
    MoviesAndCinemasManager.prototype.populateCinemas = function () {
        var _this = this;
        fetch("cinema.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.cinemasArr = data;
        })["catch"](function (error) { return console.log(error); });
    };
    return MoviesAndCinemasManager;
}());
