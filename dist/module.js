var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
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
var Cart = /** @class */ (function () {
    function Cart(barcode, price, movieID, seats) {
        this.barcode = barcode;
        this.price = price;
        this.movieID = movieID;
        this.seats = seats;
    }
    return Cart;
}());
