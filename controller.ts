// Header -
const images = [
  "./assets/imgCover/fastXCover.jpeg",
  "./assets/imgCover/mermaidCover.jpeg",
  "./assets/imgCover/screamCover.jpg",
];

let currentImageIndex = 0;
const imageElement = document.querySelector(".header") as HTMLDivElement;

function changeCoverImage() {
  imageElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}
window.addEventListener("load", () => {
  changeCoverImage();
  setInterval(changeCoverImage, 3000);
});

// Fetch movie data from json -
let movies: any[] = [];
let cinemas: any[] = [];

fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
    searchFieldsRenderer.populateMovies(data);
  })
  .catch((error) => console.log(error));

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    cinemas = data;
    searchFieldsRenderer.populateLocations(data);
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
function openTrailer(mov: number) {
  const selectedMovie = movies.find((element) => element.uuid === Number(mov));

  console.log();

  const popup: string = `<div class="trailer_container">
  <div class="trailer_container-exit" onclick="closePopup()">
    <img src="./assets/x-thin-svgrepo-com.svg" alt=""  class="x-icon"/>
  </div>
  <div class="trailer_container-content">
    <h2>${selectedMovie.name}</h2>
    <iframe  width="640" height="360" 
      src="${selectedMovie.trailerURL}"
      frameborder="0"
    ></iframe>
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

// Genre options -
// const genreOptions = () => {
//   const allGenres = [
//     "Action",
//     "Kids",
//     "Animation",
//     "Comedy",
//     "Crime",
//     "Drama",
//     "Sci-fi",
//     "Horror",
//     "Thriller",
//     "Fantasy",
//     "Musical",
//     "Adventure",
//     "Foreign",
//   ];

//   allGenres.forEach((genre) => {
//     const option = document.createElement("option");
//     option.value = genre;
//     option.textContent = genre;
//     genreDropdown!.appendChild(option);
//   });
// };

// Handle genre change -
// function filterMoviesByGenre() {
//   if (genreDropdown && movieCardsContainer) {
//     const selectedGenre = genreDropdown.value;

//     if (selectedGenre === "") {
//       renderMovieCards(movies);
//     } else {
//       const filteredMovies = movies.filter((movie) =>
//         movie.genre.includes(selectedGenre)
//       );
//       renderMovieCards(filteredMovies);
//     }
//   }
// }
// genreDropdown!.addEventListener("change", filterMoviesByGenre);

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

  public onMovieSelect(searchFilter: string, movieUuid: string, eve) {
    let filteredMovies: Movie[] = [];
    const moviesLenght: number = movies.length;

    for (let i = 0; i < moviesLenght; i++) {
      if (movies[i].uuid === Number(movieUuid)) {
        filteredMovies.push(movies[i]);

        break;
      }
    }

    renderMovieCards(filteredMovies);
  }

  public onDateSelect(searchFilter: string, dateTimeStamp: string, eve) {
    let newDate = new Date(dateTimeStamp);
    searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);

    renderMovieCards(this.filterMoviesByDate(newDate));
  }

  public onGenreSelect(searchFilter: string, genre: string, eve) {
    searchFieldsRenderer.updateGenreSearchTitle(searchFilter, genre);

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
        searchFieldsRenderer.renderSecondarySearchMenus(this.selectedCinema);

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

  public updateGenreSearchTitle(searchFilter: string, genre: string) {
    const selector = document.querySelector(
      `.${searchFilter}`
    ) as HTMLDivElement;

    selector.children[0].innerHTML = ` ${genre} `;
  }

  public renderSecondarySearchMenus(selectedCinema: Cinema) {
    secondarySearchArea.classList.add("search__secondary-search--visible");
    this.populateDates(selectedCinema);
    this.populateGenres(selectedCinema);
  }

  private populateDates(selectedCinema: Cinema) {
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

  public populateLocations(cinemas: any[]) {
    this.cinemas = cinemas;

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

  public populateMovies(movies: any[]) {
    this.movies = movies;

    searchMoviesMenu.innerHTML = movies
      .map((movie) => {
        return `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onMovieSelect('search__movies-dropdown', '${movie.uuid}', event)"
          >${movie.name}</a>
      </li>`;
      })
      .join("");
  }
}

// VIP -
vipButton?.addEventListener("click", () => {
  window.location.href = "./vipPage/vip.html";
});
