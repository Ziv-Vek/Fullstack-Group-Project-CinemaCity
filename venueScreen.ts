/// Present screening details in Navbar
const screeningDetails = document.querySelector(".screening") as HTMLDivElement;

interface Seat {
  line: number;
  seatID: number;
  isTaken: boolean;
}

const selectedScreeningRaw = getData("selectedMovie").split(", ");
const cinemas = getData("cinemaData");
const selectedCinema = cinemas.find(
  (result) => result.id === Number(selectedScreeningRaw[1])
);
const movies: Movie[] = getData("movieData");
const selectedMovie: Movie | undefined = movies.find(
  (result) => result.uuid === Number(selectedScreeningRaw[0])
);

const selectedScreening = selectedCinema.movieList.find(
  (result) => result.uuid === Number(selectedScreeningRaw[3])
);

console.log(selectedScreening);

const movieViewDetails: string = `
<div>
<lable>Movie Name: </lable></div>`;

function renderDetails(element: HTMLDivElement, renderDetails: string) {
  element.innerHTML = renderDetails;
}

const html = document.querySelector(".venue_view") as HTMLDivElement;
const movieDetails = document.querySelector(".movie_details") as HTMLDivElement;
const venueData: Seat[] = [];

const renderScreeningInNavbar = (
  selectedMovie: Movie,
  selectedCinema: Cinema,
  selectedScreening: any
) => {
  const screeningDate = new Date(selectedScreening.screenDate);
  const dateString: string = screeningDate.toLocaleString("default", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });

  console.log(selectedScreening);

  screeningDetails.innerHTML = `<img
  src="${selectedMovie.image}"
  alt=""
  class="screening__movie-img" />
  <div class="screening__text-container">
  <p class="screening__text-container__title">${selectedMovie.name}</p>
  <p class="screening__text-container__details">${selectedCinema.cinemaName}</p>
  <p class="screening__text-container__details">${dateString}, ${selectedScreening.screenTime} </p>
  <p class="screening__text-container__details">Venue ${selectedScreening.venue} </p>
  </div>`;
};

renderScreeningInNavbar(selectedMovie, selectedCinema, selectedScreening);

const selected: { line: number; seat: number }[] = [];
fetch("venue.json")
  .then((response) => response.json())
  .then((data) => {
    const venue = data[0];

    venue.seats.forEach((seat: any) => {
      venueData.push({
        line: seat.line,
        seatID: seat.seatID,
        isTaken: seat.isTaken,
      });
    });

    updateSeatTakenStatus(venueData, selectedScreening.seats.index);
    seatsRender(venueData);
  })
  .catch((error) => console.log(error));

function updateSeatTakenStatus(seats: Seat[], selectionIndex: any[]) {
  seats.forEach((seat) => {
    const foundIndex = selectionIndex.findIndex(
      (data) => seat.line === data.line && seat.seatID === data.seatID
    );
    seat.isTaken = foundIndex !== -1;
  });
}

function seatsRender(seats: Seat[]) {
  const lineSeatsMap: Record<number, number> = {
    1: 10,
    2: 10,
    3: 10,
    4: 12,
    5: 14,
    6: 14,
  };

  const lineElements: HTMLElement[] = [];

  for (let line = 1; line <= 6; line++) {
    const seatsPerLine = lineSeatsMap[line] || 0;

    const lineElement = document.createElement("div");
    lineElement.classList.add("venue__line");

    for (let seat = 1; seat <= seatsPerLine; seat++) {
      const foundSeat = seats.find((s) => s.line === line && s.seatID === seat);

      const isTaken = foundSeat ? foundSeat.isTaken : false;
      seatsRenderTaken(isTaken, lineElement, seat, line);
    }

    lineElements.push(lineElement);
  }

  html.append(...lineElements);
}

function seatsRenderTaken(
  isTaken: boolean,
  element: HTMLElement,
  seat: number,
  line: number
) {
  const seatElement = document.createElement("div");

  seatElement.classList.add("venue__seat");
  seatElement.classList.add(`${line}-${seat}`);
  seatElement.textContent = `${seat}`;

  if (isTaken) {
    seatElement.classList.replace("venue__seat", "venue__seat--taken");
  }

  element.appendChild(seatElement);
}

setTimeout(function () {
  const allSeats: NodeListOf<HTMLElement> =
    document.querySelectorAll(".venue__seat");

  allSeats.forEach((seat) => {
    seat.addEventListener("click", () => {
      const selectedSeat: string[] = seat.classList[1].split("-");
      const line = Number(selectedSeat[0]);
      const seatID = Number(selectedSeat[1]);

      const seatIndex = selected.findIndex(
        (rs) => rs.line === line && rs.seat === seatID
      );
      if (seatIndex !== -1) {
        selected.splice(seatIndex, 1); // Remove the selected seat from the array
        seat.style.backgroundColor = "white";
      } else {
        seat.style.backgroundColor = "green";
        selected.push({
          line,
          seat: seatID,
        });
      }
      console.log(selected);
    });
  });
}, 100);

// Render movie tickets -
const renderMovieTickets = (movies, cinema) => {
  let movieTickets = "";

  movies.forEach((movie) => {
    const seats = movie.seats
      .map((seat) => `Line ${seat.line}, Seat ${seat.seatID}`)
      .join(", ");

    movieTickets += `<div class="ticket"> 
      <div>${movie.uuid}</div>
      <h1>${movie.name}</h1>
      <img class="ticket__image" src="${movie.image}" />
      <div class="ticket__screenDate">${movie.screenDate}</div> 
      <div class="ticket__screenTime">${movie.screenTime}</div>
      <div class="ticket__venue">${cinema.cinemaName} - Venue ${movie.venue[0]}</div> 
      <div class="ticket__seats">Selected Seats: ${seats}</div> 
    </div>`;
  });

  const ticketContainer = document.querySelector(".ticket-container");
  ticketContainer!.innerHTML = movieTickets;
};

function goToPayment() {
  setData("selectedSeats", selected);
  setData("orderMovie", selectedScreening);
  setData("cinemaSelected", selectedCinema);
  setData("movieDetails", selectedMovie);
}
