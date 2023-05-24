var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList, seats) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
        this.seats = seats;
        moviesAndCinemasManager.addCinema(this);
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
        moviesAndCinemasManager.addMovie(this);
    }
    return Movie;
}());
var MoviesAndCinemasManager = /** @class */ (function () {
    function MoviesAndCinemasManager() {
        this.movies = [];
        this.cinemas = [];
    }
    MoviesAndCinemasManager.prototype.addMovie = function (movie) {
        this.movies.push(movie);
    };
    Object.defineProperty(MoviesAndCinemasManager.prototype, "getMoviesArr", {
        get: function () {
            return this.movies;
        },
        enumerable: false,
        configurable: true
    });
    MoviesAndCinemasManager.prototype.addCinema = function (cinema) {
        this.cinemas.push(cinema);
    };
    Object.defineProperty(MoviesAndCinemasManager.prototype, "getCinemaArr", {
        get: function () {
            return this.cinemas;
        },
        enumerable: false,
        configurable: true
    });
    return MoviesAndCinemasManager;
}());
var moviesAndCinemasManager = new MoviesAndCinemasManager();
