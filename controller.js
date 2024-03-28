"use strict";
/**Responsible for showing and cycling through movie images in the page header */
class HeaderManager {
    constructor() {
        this.currentIndex = 0;
        this.fadeOutInterval = 700;
        this.switchImageInterval = 5000;
    }
    showImage(index) {
        if (carousel) {
            carousel.classList.add("fade-in");
            imageContainers.forEach((container, i) => {
                container.classList.remove("active");
                container.classList.add(i === index ? "active" : "middle");
            });
            setTimeout(() => {
                carousel.classList.remove("fade-in");
            }, this.fadeOutInterval);
        }
    }
    startTimer() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % imageContainers.length;
            this.showImage(this.currentIndex);
        }, this.switchImageInterval);
    }
}
/** Responsible for the rendering and logic of a movie card */
class MovieCardManager {
}
// Render movie cards -
const renderMovieCards = (movies) => {
    let movieCardsHTML = "";
    movies.forEach((movie) => {
        movieCardsHTML += `<div class="movieCard">
    <div class="movieImage">
      <img src="${movie.image}" />
    </div>
    <div class="movieDetails">
      <h2 class="movieDetails__movieName">${movie.name}</h2>
      <span onclick="openTrailer('${movie.uuid}')" id="trailerBtn" class="material-symbols-outlined movieDetails__trailerButton">play_circle</span>
      <p class="movieDetails__movieDescription">${movie.description}</p>

      <div class="movieDetails__moreInfo">
      <p class="movieDetails__genre">Genre: ${movie.genre.join(", ")}</p>
      <p class="movieDetails__ageLimit">Age Limit: ${movie.ageLimit}</p>
      <p class="movieDetails__screenDuration">Screen Duration: ${movie.screenDuration}</p>
      <p class="movieDetails__premiere">Premiere: ${movie.premiere}</p>
   </div>

      <div class="movieDetails__hours-container">
      ${generateHoursHtml(movie.uuid)}
      
      </div>
      <a class="movieDetails__moviePageButton" href="./moviePage/moviePage.html?id=${movie.uuid}" onclick="transferMovieData(event, ${movie.uuid})">MOVIE PAGE</a>
    </div>
  </div>`;
    });
    movieCardsContainer.innerHTML = movieCardsHTML;
};
const generateHoursHtml = (movieUuid) => {
    let cinema = searchHandler.getSelectedCinema;
    let screenTimes = [];
    let screenUuid = [];
    if (cinema === null) {
        return "";
    }
    const movieListLenght = cinema.movieList.length;
    for (let i = 0; i < movieListLenght; i++) {
        let movieInstance = cinema.movieList[i];
        if (movieInstance.movieID === movieUuid) {
            screenTimes.push(movieInstance.screenTime);
            screenUuid.push(movieInstance.uuid);
        }
    }
    let screenUuidIndex = -1;
    let html = screenTimes
        .map((screenTime) => {
        screenUuidIndex++;
        return `<a
       class="movieDetails__hour"
       onclick="onHourSelection(${movieUuid}, ${cinema.id}, '${screenTime}', ${screenUuid[screenUuidIndex]})"
       href="./venueScreen.html"
       >
       ${screenTime}
     </a>
    `;
    })
        .join(" ");
    return html;
};
const onHourSelection = (movieUuid, cinemaId, screenTime, screenUuid) => {
    setData("selectedMovie", `${movieUuid}, ${cinemaId}, ${screenTime}, ${screenUuid}`);
};
// Open trailer -
const openTrailer = (mov) => {
    const selectedMovie = movies.find((element) => element.uuid === Number(mov));
    console.log();
    const popup = `<div class="trailer_container">
  <div class="trailer_container__exitBox">
  <div class="trailer_container-exit" onclick="closePopup()">
  <span class="material-symbols-outlined trailer_container-exitBtn">
  close
  </span>
  </div>
  <div class="trailer_container-content">
    <h2>${selectedMovie.name}</h2>
    <iframe  width="640" height="360" 
      src="${selectedMovie.trailerURL}"
      frameborder="0"
    ></iframe>
  </div>
  </div>
</div>`;
    const movieCardsContainer = document.querySelector(".trailer_popup");
    movieCardsContainer.innerHTML += popup;
};
// Close trailer popup -
const closePopup = () => {
    document.querySelector(".trailer_container").remove();
};
// Transfer data to movie page -
const transferMovieData = (event, movieId) => {
    event.preventDefault();
    const movie = this.movies.find((movie) => movie.uuid === movieId);
    if (movie) {
        const movieData = movie;
        const movieDataString = encodeURIComponent(JSON.stringify(movieData));
        const moviePageURL = `./moviePage/moviePage.html?data=${movieDataString}`;
        window.location.href = moviePageURL;
    }
};
const populateMoviePage = (movie) => {
    document.querySelector("#movieImage").innerHTML = `<img src="../${movie.image}" class="movie-image"/>`;
    document.querySelector("#movieTitle").textContent = movie.name;
    document.querySelector("#movieDescription").textContent = movie.description;
    document.querySelector("#movieGenre").textContent = movie.genre.join(", ");
    document.querySelector("#movieAgeLimit").textContent =
        movie.ageLimit.toString();
    document.querySelector("#movieDuration").textContent =
        "Duration in Minutes: " + movie.screenDuration.toString();
    document.querySelector("#moviePremiere").textContent =
        "Premiere: " + movie.premiere.toString();
    const movieTrailerContainer = document.querySelector("#movieTrailer");
    const iframe = document.createElement("iframe");
    iframe.src = movie.trailerURL;
    iframe.allowFullscreen = true;
    iframe.width = "500px";
    iframe.height = "300px";
    movieTrailerContainer.appendChild(iframe);
};
/** Handles user search selections */
class SearchHandler {
    constructor() {
        this.selectedCinema = null;
        this.selectedDate = null;
        this.selectedGenre = null;
        this.filteredMovies = [];
        this.locationFilterText = null;
        this.dateFilterText = null;
    }
    get getFilteredMoviesByLocation() {
        return this.filteredMovies;
    }
    get getSelectedCinema() {
        return this.selectedCinema;
    }
    onLocationSelect(searchFilter, location, eve, isPrimarySearch) {
        try {
            if (searchFilter === "")
                throw new Error("No search filter was passed");
            if (location === "")
                throw new Error("No location filter selection was passed");
            if (!searchFieldsRenderer)
                throw new Error("searchFieldsRenderer not found");
            searchFieldsRenderer.updateSearchTitle(searchFilter, location);
            this.locationFilterText = location;
            if (!isPrimarySearch) {
                searchFieldsRenderer.populateDates(this.translateCinemaNameToCinema(location), false);
            }
            else {
                this.filteredMovies = this.filterMoviesByCinemas(location);
                if (this.filteredMovies.length === 0) {
                    renderMovieCards(movies);
                }
                else {
                    renderMovieCards(this.filteredMovies);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    translateCinemaNameToCinema(cinemaName) {
        const allCinemas = getData("cinemaData");
        const allCinemasLenght = allCinemas.length;
        for (let i = 0; i < allCinemasLenght; i++) {
            if (allCinemas[i].cinemaName === cinemaName) {
                return allCinemas[i];
            }
        }
    }
    onMovieSelect(searchFilter, movieUuid, eve) {
        let filteredMovies = [];
        const moviesLenght = movies.length;
        for (let i = 0; i < moviesLenght; i++) {
            if (movies[i].uuid === Number(movieUuid)) {
                filteredMovies.push(movies[i]);
                break;
            }
        }
    }
    onDateSelect(searchFilter, dateTimeStamp, eve, cinemaName, isPrimarySearch) {
        let newDate = new Date(dateTimeStamp);
        searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);
        if (isPrimarySearch)
            renderMovieCards(this.filterMoviesByDate(newDate));
        else
            moviePageRenderer.renderScreenings(dateTimeStamp, this.translateCinemaNameToCinema(cinemaName));
    }
    onGenreSelect(searchFilter, genre, eve) {
        searchFieldsRenderer.updateSearchTitle(searchFilter, genre);
        renderMovieCards(this.filterMoviesByGenre(genre));
    }
    filterMoviesByCinemas(location) {
        let filteredMovies = [];
        for (let cinema of cinemas) {
            if (cinema.cinemaName === location) {
                let allMoviesIdInCinema = [];
                this.selectedCinema = cinema;
                cinema.movieList.forEach((movie) => {
                    allMoviesIdInCinema.push(movie.movieID);
                });
                const uniqueMoviesIdInCinema = new Set(allMoviesIdInCinema);
                movies.forEach((movie) => {
                    uniqueMoviesIdInCinema.forEach((idByCinema) => {
                        if (idByCinema === movie.uuid) {
                            filteredMovies.push(movie);
                        }
                    });
                });
                this.filteredMovies = filteredMovies;
                searchFieldsRenderer.renderSecondarySearchMenus(this.selectedCinema, null);
                return filteredMovies;
            }
        }
        return filteredMovies;
    }
    filterMoviesByDate(newDate) {
        var _a;
        let filteredMoviesByDate = [];
        (_a = this.selectedCinema) === null || _a === void 0 ? void 0 : _a.movieList.forEach((movieInCinema) => {
            let movieScreenDateArr = movieInCinema.screenDate.split(" ");
            if (Number(movieScreenDateArr[0]) === newDate.getMonth() + 1 &&
                Number(movieScreenDateArr[1]) === newDate.getDate()) {
                filteredMoviesByDate.push(movieInCinema);
            }
        });
        let filteredMoviesByDateLengh = filteredMoviesByDate.length;
        let filteredMoviesLengh = this.filteredMovies.length;
        let filteredMoviesByCinemaAndDate = [];
        for (let i = 0; i < filteredMoviesByDateLengh; i++) {
            for (let j = 0; j < filteredMoviesLengh; j++) {
                if (filteredMoviesByDate[i].movieID === this.filteredMovies[j].uuid) {
                    filteredMoviesByCinemaAndDate.push(this.filteredMovies[j]);
                }
            }
        }
        return filteredMoviesByCinemaAndDate;
    }
    //private filterScreeningHoursByDate() {}
    filterMoviesByGenre(selectedGenre) {
        let filteredMovies = [];
        let filteredMoviesLengh = this.filteredMovies.length;
        for (let i = 0; i < filteredMoviesLengh; i++) {
            let movieGenresLengh = this.filteredMovies[i].genre.length;
            for (let j = 0; j < movieGenresLengh; j++) {
                if (this.filteredMovies[i].genre[j] === selectedGenre) {
                    filteredMovies.push(this.filteredMovies[i]);
                    break;
                }
            }
        }
        return filteredMovies;
    }
}
/** Responsible for rendering the search fields */
class SearchFieldsRenderer {
    constructor() {
        this.movies = [];
        this.numOfDaysInDateSearch = 14;
    }
    updateSearchTitle(searchFilter, newTitle) {
        const selector = document.querySelector(`.${searchFilter}`);
        selector.children[0].innerHTML = newTitle;
    }
    updateDateSearchTitle(searchFilter, date) {
        const selector = document.querySelector(`.${searchFilter}`);
        selector.children[0].innerHTML = ` ${date.toLocaleString("default", {
            weekday: "short",
            day: "2-digit",
            month: "short",
        })} `;
    }
    renderSecondarySearchMenus(selectedCinema, selectedMovie) {
        if (selectedCinema) {
            if (!secondarySearchArea.classList.contains("search__secondary-search--visible"))
                secondarySearchArea.classList.add("search__secondary-search--visible");
            if (genreSecondaryDropdown.classList.contains("search__secondary-search--invisible"))
                genreSecondaryDropdown.classList.remove("search__secondary-search--invisible");
            if (datesSecondaryDropdown.classList.contains("search__secondary-search--invisible"))
                datesSecondaryDropdown.classList.remove("search__secondary-search--invisible");
            this.populateDates(selectedCinema, true);
            this.populateGenres(selectedCinema);
        }
        if (selectedMovie) {
            if (!secondarySearchArea.classList.contains("search__secondary-search--visible"))
                secondarySearchArea.classList.add("search__secondary-search--visible");
            if (cinemaSecondaryDropdown.classList.contains("search__secondary-search--invisible"))
                cinemaSecondaryDropdown.classList.remove("search__secondary-search--invisible");
            this.populateLocations(getData("cinemaData"), false);
        }
    }
    populateDates(selectedCinema, isPrimarySearch) {
        const currentDayInMonth = new Date().getDate();
        const lastSearchDay = currentDayInMonth + this.numOfDaysInDateSearch;
        const today = new Date();
        let availableDates = [];
        selectedCinema.movieList.forEach((movie) => {
            if (!availableDates.includes(movie.screenDate)) {
                availableDates.push(movie.screenDate);
            }
        });
        searchDateMenu.innerHTML = "";
        const availableDatesLengh = availableDates.length;
        if (availableDatesLengh === 0) {
            searchDateMenu.innerHTML = `No screening days found`;
        }
        else {
            for (let i = 0; i < availableDatesLengh; i++) {
                let newDate = new Date(availableDates[i]);
                searchDateMenu.innerHTML += `<li>
        <a
          class="dropdown-item"

          onclick="searchHandler.onDateSelect('search__dates-dropdown', '${newDate}', event, '${selectedCinema.cinemaName}', ${isPrimarySearch})"
          >${newDate.toLocaleString("default", {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}</a>
      </li>`;
            }
        }
    }
    populateGenres(selectedCinema) {
        let availableGenres = [];
        let filteredMovies = searchHandler.getFilteredMoviesByLocation;
        filteredMovies.forEach((movie) => {
            movie.genre.forEach((movieGenre) => {
                if (!availableGenres.includes(movieGenre)) {
                    availableGenres.push(movieGenre);
                }
            });
        });
        searchGenreMenu.innerHTML = "";
        searchGenreMenu.innerHTML = availableGenres
            .map((genre) => {
            return `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onGenreSelect('search__genre-dropdown', '${genre}', event)"
          >${genre}</a>
      </li>`;
        })
            .join("");
    }
    populateLocations(cinemas, isPrimarySearch) {
        this.cinemas = cinemas;
        for (let i = 0; i < searchLocationMenu.length; i++) {
            searchLocationMenu[i].innerHTML = cinemas
                .map((cinema) => {
                return `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onLocationSelect('search__cinemas-dropdown', '${cinema.cinemaName}', event, ${isPrimarySearch})"
          >${cinema.cinemaName}</a>
      </li>`;
            })
                .join("");
        }
    }
    populateMovies(movies) {
        this.movies = movies;
        searchMoviesMenu.innerHTML = movies
            .map((movie) => {
            return `<li>
      <a class="dropdown-item" href="./moviePage/moviePage.html?id=${movie.uuid}" onclick="transferMovieData(event, ${movie.uuid})">${movie.name}</a>
    </li>`;
        })
            .join("");
    }
}
// VIP -
vipButton === null || vipButton === void 0 ? void 0 : vipButton.addEventListener("click", () => {
    window.location.href = "./vipPage/vip.html";
});
class MoviePageManager {
    constructor() { }
}
class MoviePageRenderer {
    constructor(movieUuid, allCinemas) {
        this.movieUuid = movieUuid;
        this.allCinemas = allCinemas;
        this.allCinemas = [];
        this.movieUuid = movieUuid;
        this.allCinemas = allCinemas;
    }
    renderScreenings(screeningTimeStamp, cinema) {
        let screeningTime = new Date(screeningTimeStamp);
        let screeningUuid = [];
        cinema.movieList.forEach((screeningInstance) => {
            if (screeningInstance.movieID === this.movieUuid) {
                screeningUuid.push(screeningInstance);
            }
        });
        screeningWrapperDiv.innerHTML = `
    <div class="screening">
        <p class="screening__cinema">${cinema.cinemaName}</p>
        <p class="screening__date">
        ${screeningTime.toLocaleString("default", {
            weekday: "long",
            day: "2-digit",
            month: "short",
        })}
        </p>
        <div class="screening__hours-container">${this.generateScreeningHoursHtml(cinema)}
        </div>
      </div>
      `;
    }
    generateScreeningHoursHtml(cinema) {
        let screenTimes = [];
        let screenUuid = [];
        if (cinema === null) {
            return "";
        }
        const movieListLenght = cinema.movieList.length;
        for (let i = 0; i < movieListLenght; i++) {
            let movieInstance = cinema.movieList[i];
            if (movieInstance.movieID === this.movieUuid) {
                screenTimes.push(movieInstance.screenTime);
                screenUuid.push(movieInstance.uuid);
            }
        }
        let screenUuidIndex = -1;
        let html = screenTimes
            .map((screenTime) => {
            screenUuidIndex++;
            return `<a
       class="screening__hour"
       onclick="onHourSelection(${this.movieUuid}, ${cinema.id}, '${screenTime}', ${screenUuid[screenUuidIndex]})"
       href="../venueScreen.html"
       >
       ${screenTime}
     </a>
    `;
        })
            .join(" ");
        return html;
    }
}
