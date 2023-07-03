"use strict";
class Movie {
    constructor(image, name, genre, ageLimit, premiere, screenDuration, description, trailerURL, cinemaID) {
        this.image = image;
        this.name = name;
        this.genre = genre;
        this.ageLimit = ageLimit;
        this.premiere = premiere;
        this.screenDuration = screenDuration;
        this.description = description;
        this.trailerURL = trailerURL;
        this.cinemaID = cinemaID;
    }
}
class Seat {
    constructor() { }
}
// Cinema (locations) -
class Cinema {
    constructor(id, cinemaName, movieList) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
    }
}
// Event form -
class EventForm {
    constructor(name, email, number) {
        this.name = name;
        this.email = email;
        this.number = number;
    }
}
// Payment form -
class PayForm {
    constructor(name, email, idNumber, cardNumber, month, year) {
        this.name = name;
        this.email = email;
        this.idNumber = idNumber;
        this.cardNumber = cardNumber;
        this.month = month;
        this.year = year;
    }
}
