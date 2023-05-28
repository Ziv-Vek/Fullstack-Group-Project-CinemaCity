let movies: any[] = [];
let cinemas: any[] = [];

// Fetch movie data from json -
fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    renderMovieCards(movies);
    genreOptions();
  })
  .catch((error) => console.log(error));

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    cinemas = data;
    searchFieldsRenderer.main(data);
  })
  .catch((error) => console.log(error));

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
      <p class="movieDetails__movieDescription">${movie.description}</p>
      <p class="movieDetails__genre">Genre: ${movie.genre.join(", ")}</p>
      <p class="movieDetails__ageLimit">Age Limit: ${movie.ageLimit}</p>
      <p class="movieDetails__screenDuration">Screen Duration: ${
        movie.screenDuration
      }</p>
      <p class="movieDetails__premiere">Premiere: ${movie.premiere}</p>
      <button class="movieDetails__trailerButton" onclick="openTrailer('${
        movie.uuid
      }')">
      <span id="trailerBtn" class="material-symbols-outlined">play_circle</span>
      </button>
      <a class="movieDetails__moviePageButton" href="./moviePage/moviePage.html?id=${
        movie.uuid
      }" onclick="transferMovieData(event, ${movie.uuid})">MOVIE PAGE</a>
    </div>
  </div>`;
  });

  movieCardsContainer!.innerHTML = movieCardsHTML;
}

// Open trailer -
const openTrailer = (trailerURL) => {
  window.open(trailerURL, "_blank");
};

// Genre options -
const genreOptions = () => {
  const allGenres = [
    "action",
    "kids",
    "animation",
    "comedy",
    "crime",
    "drama",
    "sci-fi",
    "horror",
    "thriller",
    "fantasy",
    "musical",
    "adventure",
    "foreign",
  ];

  allGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreDropdown!.appendChild(option);
  });
};

// Handle genre change -
function filterMoviesByGenre() {
  if (genreDropdown && movieCardsContainer) {
    const selectedGenre = genreDropdown.value;

    if (selectedGenre === "") {
      renderMovieCards(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.includes(selectedGenre)
      );
      renderMovieCards(filteredMovies);
    }
  }
}
genreDropdown!.addEventListener("change", filterMoviesByGenre);

// Transfer data to movie page -
function transferMovieData(event: Event, movieId: number) {
  event.preventDefault();

  const movie = movies.find((movie) => movie.uuid === movieId);

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

  public onLocationSelect(searchFilter: string, location: string, eve) {
    try {
      if (searchFilter === "") throw new Error("No search filter was passed");
      if (location === "")
        throw new Error("No location filter selection was passed");

      if (!searchFieldsRenderer)
        throw new Error("searchFieldsRenderer not found");

      searchFieldsRenderer.updateSearchTitle(searchFilter, location);
      this.locationFilterText = location;
      this.filteredMovies = this.filterMoviesByCinemas(location);

      if (this.filteredMovies.length === 0) {
        renderMovieCards(movies);
      } else {
        renderMovieCards(this.filteredMovies);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public onDateSelect(searchFilter: string, dateTimeStamp: string, eve) {
    let newDate = new Date(dateTimeStamp);
    let filteredMoviesByDate: any[] = [];

    searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);

    this.selectedCinema?.movieList.forEach((movieInCinema) => {
      let movieScreenDateArr: string[] = movieInCinema.screenDate.split(" ");

      if (
        Number(movieScreenDateArr[0]) === newDate.getMonth() &&
        Number(movieScreenDateArr[1]) === newDate.getDate()
      ) {
        filteredMoviesByDate.push(movieInCinema);
      }
    });

    console.log(filteredMoviesByDate);

    renderMovieCards(filteredMoviesByDate);
  }

  private filterMoviesByCinemas(location: string): Movie[] {
    let filteredMovies: Movie[] = [];

    searchFieldsRenderer.renderSecondarySearchMenus();

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

        return filteredMovies;
      }
    }

    return filteredMovies;
  }
}

/** Responsible for rendering the search fields */
class SearchFieldsRenderer {
  public cinemas: any[];
  private numOfDaysInDateSearch: number = 14;

  constructor() {}

  public main(cinemas) {
    this.cinemas = cinemas;
    this.populateLocations();
  }

  public updateSearchTitle(searchFilter: string, location: string) {
    const selector = document.querySelector(
      `.${searchFilter}`
    ) as HTMLDivElement;

    selector.children[0].innerHTML = location;
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

  public update;

  public renderSecondarySearchMenus() {
    secondarySearchArea.classList.add("search__secondary-search--visible");
    this.populateDates();
    this.populateGenres();
  }

  private populateDates() {
    const currentDayInMonth = new Date().getDate();
    const lastSearchDay = currentDayInMonth + this.numOfDaysInDateSearch;
    const today = new Date();
    let cinema: Cinema;

    cinemas.forEach((cin) => {
      if (cin.cinemaName === searchHandler.locationFilter) {
        cinema = cin;
      }
    });

    searchDateMenu.innerHTML = "";

    for (let i = currentDayInMonth; i < lastSearchDay; i++) {
      let newDateTimeStamp = new Date(today).setDate(i);
      let newDate = new Date(newDateTimeStamp);

      searchDateMenu.innerHTML += `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onDateSelect('search__dates-dropdown', '${newDate}', event)"
          >${newDate.toLocaleString("default", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}</a>
      </li>`;
    }
  }

  private populateGenres() {}

  private populateLocations() {
    searchLocationMenu.innerHTML = cinemas
      .map((cinema) => {
        return `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onLocationSelect('search__cinemas-dropdown', '${cinema.cinemaName}', event)"
          >${cinema.cinemaName}</a>
      </li>`;
      })
      .join("");
  }
}
