// Header -
const carousel: HTMLElement | null = document.querySelector(".header");
const imageContainers: HTMLElement[] = Array.from(
  document.querySelectorAll(".image-container")
);
let currentIndex: number = 0;

function showImage(index: number): void {
  if (carousel) {
    carousel.classList.add("fade-in");

    imageContainers.forEach((container: HTMLElement, i: number) => {
      container.classList.remove("active");
      container.classList.add(i === index ? "active" : "middle");
    });

    setTimeout(() => {
      carousel.classList.remove("fade-in");
    }, 700);
  }
}

function startTimer(): void {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % imageContainers.length;
    showImage(currentIndex);
  }, 5000);
}

if (carousel) {
  showImage(currentIndex);
  startTimer();
}

// Render movie cards -
function renderMovieCards(movies: any[]) {
  let movieCardsHTML = "";

  movies.forEach((movie) => {
    movieCardsHTML += `<div class="movieCard">
    <div class="movieImage">
      <img src="${movie.image}" />
    </div>
    <div class="movieDetails">
      <h2 class="movieDetails__movieName">${movie.name}</h2>
      <span onclick="openTrailer('${
        movie.uuid
      }')" id="trailerBtn" class="material-symbols-outlined movieDetails__trailerButton">play_circle</span>
      <p class="movieDetails__movieDescription">${movie.description}</p>

      <div class="movieDetails__moreInfo">
      <p class="movieDetails__genre">Genre: ${movie.genre.join(", ")}</p>
      <p class="movieDetails__ageLimit">Age Limit: ${movie.ageLimit}</p>
      <p class="movieDetails__screenDuration">Screen Duration: ${
        movie.screenDuration
      }</p>
      <p class="movieDetails__premiere">Premiere: ${movie.premiere}</p>
   </div>

      <div class="movieDetails__hours-container">
      ${generateHoursHtml(movie.uuid)}
      
      </div>
      <a class="movieDetails__moviePageButton" href="./moviePage/moviePage.html?id=${
        movie.uuid
      }" onclick="transferMovieData(event, ${movie.uuid})">MOVIE PAGE</a>
    </div>
  </div>`;
  });

  movieCardsContainer!.innerHTML = movieCardsHTML;
}

const generateHoursHtml = (movieUuid: number): string => {
  let cinema: Cinema | null = searchHandler.getSelectedCinema;
  let screenTimes: string[] = [];
  let screenUuid: number[] = [];

  if (cinema === null) {
    return "";
  }

  const movieListLenght: number = cinema.movieList.length;
  for (let i = 0; i < movieListLenght; i++) {
    let movieInstance = cinema.movieList[i];
    if (movieInstance.movieID === movieUuid) {
      screenTimes.push(movieInstance.screenTime);
      screenUuid.push(movieInstance.uuid);
    }
  }

  let screenUuidIndex: number = -1;
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

const onHourSelection = (
  movieUuid: string,
  cinemaId: string,
  screenTime: string,
  screenUuid: string
) => {
  setData(
    "selectedMovie",
    `${movieUuid}, ${cinemaId}, ${screenTime}, ${screenUuid}`
  );
};

// Open trailer -
function openTrailer(mov: number) {
  const selectedMovie = movies.find((element) => element.uuid === Number(mov));

  console.log();

  const popup: string = `<div class="trailer_container">
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
  const movieCardsContainer = document.querySelector(
    ".trailer_popup"
  ) as HTMLDivElement;

  movieCardsContainer.innerHTML += popup;
}

function closePopup() {
  document.querySelector(".trailer_container")!.remove();
}

// Transfer data to movie page -
function transferMovieData(event: Event, movieId: number) {
  event.preventDefault();

  const movie = this.movies.find((movie) => movie.uuid === movieId);

  if (movie) {
    const movieData: Movie = movie;
    const movieDataString = encodeURIComponent(JSON.stringify(movieData));
    const moviePageURL = `./moviePage/moviePage.html?data=${movieDataString}`;

    window.location.href = moviePageURL;
  }
}

function populateMoviePage(movie: Movie) {
  document.querySelector(
    "#movieImage"
  )!.innerHTML = `<img src="../${movie.image}" class="movie-image"/>`;
  document.querySelector("#movieTitle")!.textContent = movie.name;
  document.querySelector("#movieDescription")!.textContent = movie.description;
  document.querySelector("#movieGenre")!.textContent = movie.genre.join(", ");
  document.querySelector("#movieAgeLimit")!.textContent =
    movie.ageLimit.toString();
  document.querySelector("#movieDuration")!.textContent =
    "Duration in Minutes: " + movie.screenDuration.toString();
  document.querySelector("#moviePremiere")!.textContent =
    "Premiere: " + movie.premiere.toString();

  const movieTrailerContainer = document.querySelector("#movieTrailer")!;
  const iframe = document.createElement("iframe");
  iframe.src = movie.trailerURL;
  iframe.allowFullscreen = true;
  iframe.width = "500px";
  iframe.height = "300px";
  movieTrailerContainer.appendChild(iframe);
}

/** Handles user search selections */
class SearchHandler {
  selectedCinema: Cinema | null = null;
  selectedDate: Date | null = null;
  selectedGenre: string | null = null;
  private filteredMovies: Movie[] = [];
  locationFilterText: string | null = null;
  dateFilterText: string | null = null;

  constructor() {}

  public get getFilteredMoviesByLocation(): Movie[] {
    return this.filteredMovies;
  }

  public get getSelectedCinema(): Cinema | null {
    return this.selectedCinema;
  }

  public onLocationSelect(
    searchFilter: string,
    location: string,
    eve,
    isPrimarySearch: boolean
  ) {
    try {
      if (searchFilter === "") throw new Error("No search filter was passed");
      if (location === "")
        throw new Error("No location filter selection was passed");

      if (!searchFieldsRenderer)
        throw new Error("searchFieldsRenderer not found");

      searchFieldsRenderer.updateSearchTitle(searchFilter, location);
      this.locationFilterText = location;

      if (!isPrimarySearch) {
        searchFieldsRenderer.populateDates(
          this.translateCinemaNameToCinema(location),
          false
        );
      } else {
        this.filteredMovies = this.filterMoviesByCinemas(location);

        if (this.filteredMovies.length === 0) {
          renderMovieCards(movies);
        } else {
          renderMovieCards(this.filteredMovies);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  public translateCinemaNameToCinema(cinemaName: string): Cinema {
    const allCinemas: Cinema[] = getData("cinemaData");
    const allCinemasLenght: number = allCinemas.length;

    for (let i = 0; i < allCinemasLenght; i++) {
      if (allCinemas[i].cinemaName === cinemaName) {
        return allCinemas[i];
      }
    }
  }

  public onMovieSelect(searchFilter: string, movieUuid: string, eve) {
    let filteredMovies: Movie[] = [];
    const moviesLenght: number = movies.length;

    for (let i = 0; i < moviesLenght; i++) {
      if (movies[i].uuid === Number(movieUuid)) {
        filteredMovies.push(movies[i]);

        break;
      }
    }

    // searchFieldsRenderer.updateSearchTitle(
    //   searchFilter,
    //   filteredMovies[0].name
    // );

    //searchFieldsRenderer.renderSecondarySearchMenus(null, filteredMovies[0]);

    //renderMovieCards(filteredMovies);
  }

  public onDateSelect(
    searchFilter: string,
    dateTimeStamp: string,
    eve,
    cinemaName: string,
    isPrimarySearch
  ) {
    let newDate = new Date(dateTimeStamp);
    searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);

    if (isPrimarySearch) renderMovieCards(this.filterMoviesByDate(newDate));
    else
      moviePageRenderer.renderScreenings(
        dateTimeStamp,
        this.translateCinemaNameToCinema(cinemaName)
      );
  }

  public onGenreSelect(searchFilter: string, genre: string, eve) {
    searchFieldsRenderer.updateSearchTitle(searchFilter, genre);
    renderMovieCards(this.filterMoviesByGenre(genre));
  }

  private filterMoviesByCinemas(location: string): Movie[] {
    let filteredMovies: Movie[] = [];

    for (let cinema of cinemas) {
      if (cinema.cinemaName === location) {
        let allMoviesIdInCinema: number[] = [];

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
        searchFieldsRenderer.renderSecondarySearchMenus(
          this.selectedCinema,
          null
        );

        return filteredMovies;
      }
    }

    return filteredMovies;
  }

  private filterMoviesByDate(newDate: Date): Movie[] {
    let filteredMoviesByDate: Movie[] = [];

    this.selectedCinema?.movieList.forEach((movieInCinema) => {
      let movieScreenDateArr: string[] = movieInCinema.screenDate.split(" ");

      if (
        Number(movieScreenDateArr[0]) === newDate.getMonth() + 1 &&
        Number(movieScreenDateArr[1]) === newDate.getDate()
      ) {
        filteredMoviesByDate.push(movieInCinema);
      }
    });

    let filteredMoviesByDateLengh = filteredMoviesByDate.length;
    let filteredMoviesLengh = this.filteredMovies.length;
    let filteredMoviesByCinemaAndDate: Movie[] = [];

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

  private filterMoviesByGenre(selectedGenre: string): Movie[] {
    let filteredMovies: Movie[] = [];

    let filteredMoviesLengh: number = this.filteredMovies.length;

    for (let i = 0; i < filteredMoviesLengh; i++) {
      let movieGenresLengh: number = this.filteredMovies[i].genre.length;
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
  public cinemas: any[];
  public movies: Movie[] = [];
  private numOfDaysInDateSearch: number = 14;

  constructor() {}

  public updateSearchTitle(searchFilter: string, newTitle: string) {
    const selector = document.querySelector(
      `.${searchFilter}`
    ) as HTMLDivElement;

    selector.children[0].innerHTML = newTitle;
  }

  public updateDateSearchTitle(searchFilter: string, date: Date) {
    const selector = document.querySelector(
      `.${searchFilter}`
    ) as HTMLDivElement;

    selector.children[0].innerHTML = ` ${date.toLocaleString("default", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })} `;
  }

  public renderSecondarySearchMenus(
    selectedCinema: Cinema | null,
    selectedMovie: Movie | null
  ) {
    if (selectedCinema) {
      if (
        !secondarySearchArea.classList.contains(
          "search__secondary-search--visible"
        )
      )
        secondarySearchArea.classList.add("search__secondary-search--visible");

      if (
        genreSecondaryDropdown.classList.contains(
          "search__secondary-search--invisible"
        )
      )
        genreSecondaryDropdown.classList.remove(
          "search__secondary-search--invisible"
        );

      if (
        datesSecondaryDropdown.classList.contains(
          "search__secondary-search--invisible"
        )
      )
        datesSecondaryDropdown.classList.remove(
          "search__secondary-search--invisible"
        );

      this.populateDates(selectedCinema, true);
      this.populateGenres(selectedCinema);
    }

    if (selectedMovie) {
      if (
        !secondarySearchArea.classList.contains(
          "search__secondary-search--visible"
        )
      )
        secondarySearchArea.classList.add("search__secondary-search--visible");

      if (
        cinemaSecondaryDropdown.classList.contains(
          "search__secondary-search--invisible"
        )
      )
        cinemaSecondaryDropdown.classList.remove(
          "search__secondary-search--invisible"
        );

      this.populateLocations(getData("cinemaData"), false);
    }
  }

  public populateDates(selectedCinema: Cinema, isPrimarySearch: boolean) {
    const currentDayInMonth = new Date().getDate();
    const lastSearchDay = currentDayInMonth + this.numOfDaysInDateSearch;
    const today = new Date();
    let availableDates: string[] = [];

    selectedCinema.movieList.forEach((movie) => {
      if (!availableDates.includes(movie.screenDate)) {
        availableDates.push(movie.screenDate);
      }
    });

    searchDateMenu.innerHTML = "";

    const availableDatesLengh: number = availableDates.length;

    if (availableDatesLengh === 0) {
      searchDateMenu.innerHTML = `No screening days found`;
    } else {
      for (let i = 0; i < availableDatesLengh; i++) {
        let newDate = new Date(availableDates[i]);

        searchDateMenu.innerHTML += `<li>
        <a
          class="dropdown-item"

          onclick="searchHandler.onDateSelect('search__dates-dropdown', '${newDate}', event, '${
          selectedCinema.cinemaName
        }', ${isPrimarySearch})"
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

  private populateGenres(selectedCinema: Cinema) {
    let availableGenres: string[] = [];
    let filteredMovies: Movie[] = searchHandler.getFilteredMoviesByLocation;

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

  public populateLocations(cinemas: any[], isPrimarySearch: boolean) {
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

  public populateMovies(movies: any[]) {
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
vipButton?.addEventListener("click", () => {
  window.location.href = "./vipPage/vip.html";
});

class MoviePageManager {
  constructor() {}
}

class MoviePageRenderer {
  private allCinemas: any[] = [];
  private movieUuid: number;

  constructor(private movieUuid: number, private allCinemas: any[]) {
    this.movieUuid = movieUuid;
    this.allCinemas = allCinemas;
  }

  renderScreenings(screeningTimeStamp: string, cinema: Cinema) {
    let screeningTime: Date = new Date(screeningTimeStamp);
    let screeningUuid: any[] = [];

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
        <div class="screening__hours-container">${this.generateScreeningHoursHtml(
          cinema
        )}
        </div>
      </div>
      `;
  }

  private generateScreeningHoursHtml(cinema: Cinema | null): string {
    let screenTimes: string[] = [];
    let screenUuid: number[] = [];

    if (cinema === null) {
      return "";
    }

    const movieListLenght: number = cinema.movieList.length;
    for (let i = 0; i < movieListLenght; i++) {
      let movieInstance = cinema.movieList[i];
      if (movieInstance.movieID === this.movieUuid) {
        screenTimes.push(movieInstance.screenTime);
        screenUuid.push(movieInstance.uuid);
      }
    }

    let screenUuidIndex: number = -1;
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
