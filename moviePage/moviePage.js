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
// MOVIE INFO FROM THE CLICKED MOVIE CARD :
// Retrieve transferred movie data from the URL query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieDataString = urlParams.get("data");
const movieData = JSON.parse(decodeURIComponent(movieDataString));
populateMoviePage(movieData);
////////////////////////////////////////////////////////////////////////////////////////
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();
let moviePageManager;
let moviePageRenderer;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let allCinemas = yield this.getData("cinemaData");
        let allMovies = yield this.getData("movieData");
        this.moviePageRenderer = new MoviePageRenderer(movieData.uuid, allCinemas);
        this.moviePageManager = new MoviePageManager();
        searchFieldsRenderer.populateLocations(allCinemas, false);
    });
}
main();
