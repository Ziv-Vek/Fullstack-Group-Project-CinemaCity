var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
    }
    return Cinema;
}());
var Movie = /** @class */ (function () {
    function Movie(name, genre, ageLimit, image, premiere, screenDuration, description, trailerURL, seats, cinemaID) {
        this.name = name;
        this.genre = genre;
        this.ageLimit = ageLimit;
        this.image = image;
        this.premiere = premiere;
        this.screenDuration = screenDuration;
        this.description = description;
        this.trailerURL = trailerURL;
        this.seats = seats;
        this.cinemaID = cinemaID;
    }
    return Movie;
}());
