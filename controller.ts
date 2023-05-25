let filterByLocation: string | null;
let filterByDate: string | null;
let filterByGenre: string | null;

function OnListDropdownClick(filterSelection: string, searchByField: string) {
  this.filterLocation = filterLocation;
  moviesAndCinemasManager.getMoviesArr;
  //TODO: open new search tab
  aliyaFunction();
}

//
function MovieSearchFiltering(searchFields: string[]) {}

// aliya
function aliyaFunction() {}

/////////////////////////////////////////////////////////////////////////////////////
// - Aliyah Movie Cards - //
const movieCards = document.querySelector(".movieCards") as HTMLDivElement;

const renderMovieCards = (movies: Movie[]) => {
  try {
    const cards: string = movies
      .map((m) => {
        return `
        <div class="movieCard">
        <div class="movieImage">
        <img src="${m.image}" />
        </div>
        
        <div class="movieDetailsContainer">
        <div class="movieDetails">
        <h1 class="movieDetails__movieName"> ${m.name} </h1>
        <h4 class="movieDetails__movieDescription"> ${m.description} </h4>
        <p> Genre: ${m.genre} </p>
        <p> Age Limit: ${m.ageLimit} </p>
        <p> Premiere: ${m.premiere} </p>
        <p> Duration in Minutes: ${m.screenDuration} </p>
        </div>
        </div>
        </div>`;
      })
      .join(" ");

    movieCards.innerHTML = cards;
  } catch (error) {
    console.log(error);
  }
};

renderMovieCards(movies);
/////////////////////////////////////////////////////////////////////////////////////
