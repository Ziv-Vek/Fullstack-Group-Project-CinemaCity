const headerManager = new HeaderManager();
const searchFieldsRenderer = new SearchFieldsRenderer();
const searchHandler = new SearchHandler();

let movies: any[] = [];

async function main() {
  await fetch("movies.json")
    .then((response) => response.json())
    .then((data) => {
      movies = data;
      setData("movieData", data);
      renderMovieCards(data);
    })
    .catch((error) => {
      console.log(error);
    });

  await fetch("cinema.json")
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
}

main();
