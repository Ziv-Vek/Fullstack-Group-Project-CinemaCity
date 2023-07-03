"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const headerManager = new HeaderManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();
let movies = [];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("movies.json")
            .then((response) => response.json())
            .then((data) => {
            movies = data;
            setData("movieData", data);
            renderMovieCards(data);
        })
            .catch((error) => {
            console.log(error);
        });
        yield fetch("cinema.json")
            .then((response) => response.json())
            .then((data) => {
            cinemas = data;
            setData("cinemaData", data);
        })
            .catch((error) => {
            console.log(error);
        });
        headerManager.showImage(0);
        headerManager.startTimer();
        searchFieldsRenderer.populateMovies(getData("movieData"));
        searchFieldsRenderer.populateLocations(getData("cinemaData"), true);
    });
}
main();
