"use strict";

/// Present screening details in Navbar
var screeningDetails = document.querySelector(".screening");
var selectedScreeningRaw = getData("selectedMovie").split(", ");
var cinemas = getData("cinemaData");
var selectedCinema = cinemas.find(function (result) {
  return result.id === Number(selectedScreeningRaw[1]);
});
var movies = getData("movieData");
var selectedMovie = movies.find(function (result) {
  return result.uuid === Number(selectedScreeningRaw[0]);
});
var selectedScreenin = selectedCinema.movieList.find(function (result) {
  return result.uuid === Number(selectedScreeningRaw[3]);
});
console.log(selectedScreening);
var selectionData = selectedScreening;
var movieViewDetails = "\n<div>\n<lable>Movie Name: </lable></div>";

function renderDetails(element, renderDetails) {
  element.innerHTML = renderDetails;
}

var html = document.querySelector(".venue_view");
var movieDetails = document.querySelector(".movie_details");
var venueData = [];

var renderScreeningInNavbar = function renderScreeningInNavbar(movie, cinema) {
  screeningDetails.innerHTML = '<img\n  src="./assets/imgCover/fastXCover.jpeg"\n  alt=""\n  class="screening__movie-img" />\n  <div class="screening__text-container">\n  <p class="screening__text-container__title">fast x</p>\n  <p class="screening__text-container__cinema">dasf</p>\n  <p class="screening__text-container__date">dafsd</p>\n  </div>';
};

var selected = [];
fetch("venue.json").then(function (response) {
  return response.json();
}).then(function (data) {
  var venue = data[0];
  venue.seats.forEach(function (seat) {
    venueData.push({
      line: seat.line,
      seatID: seat.seatID,
      isTaken: seat.isTaken
    });
  });
  updateSeatTakenStatus(venueData, selectionData.seats.index);
  seatsRender(venueData);
})["catch"](function (error) {
  return console.log(error);
});

function updateSeatTakenStatus(seats, selectionIndex) {
  seats.forEach(function (seat) {
    var foundIndex = selectionIndex.findIndex(function (data) {
      return seat.line === data.line && seat.seatID === data.seatID;
    });
    seat.isTaken = foundIndex !== -1;
  });
}

function seatsRender(seats) {
  var lineSeatsMap = {
    1: 10,
    2: 10,
    3: 10,
    4: 12,
    5: 14,
    6: 14
  };
  var lineElements = [];

  var _loop_1 = function _loop_1(line) {
    var seatsPerLine = lineSeatsMap[line] || 0;
    var lineElement = document.createElement("div");
    lineElement.classList.add("venue__line");

    var _loop_2 = function _loop_2(seat) {
      var foundSeat = seats.find(function (s) {
        return s.line === line && s.seatID === seat;
      });
      var isTaken = foundSeat ? foundSeat.isTaken : false;
      seatsRenderTaken(isTaken, lineElement, seat, line);
    };

    for (var seat = 1; seat <= seatsPerLine; seat++) {
      _loop_2(seat);
    }

    lineElements.push(lineElement);
  };

  for (var line = 1; line <= 6; line++) {
    _loop_1(line);
  }

  html.append.apply(html, lineElements);
}

function seatsRenderTaken(isTaken, element, seat, line) {
  var seatElement = document.createElement("div");
  seatElement.classList.add("venue__seat");
  seatElement.classList.add(line + "-" + seat);
  seatElement.textContent = "" + seat;

  if (isTaken) {
    seatElement.classList.replace("venue__seat", "venue__seat--taken");
  }

  element.appendChild(seatElement);
}

setTimeout(function () {
  var allSeats = document.querySelectorAll(".venue__seat");
  allSeats.forEach(function (seat) {
    seat.addEventListener("click", function () {
      var selectedSeat = seat.classList[1].split("-");
      var line = Number(selectedSeat[0]);
      var seatID = Number(selectedSeat[1]);
      var seatIndex = selected.findIndex(function (rs) {
        return rs.line === line && rs.seat === seatID;
      });

      if (seatIndex !== -1) {
        selected.splice(seatIndex, 1); // Remove the selected seat from the array

        seat.style.backgroundColor = "white";
      } else {
        seat.style.backgroundColor = "green";
        selected.push({
          line: line,
          seat: seatID
        });
      }

      console.log(selected);
    });
  });
}, 100); // Render movie tickets -

var renderMovieTickets = function renderMovieTickets(movies, cinema) {
  var movieTickets = "";
  movies.forEach(function (movie) {
    var seats = movie.seats.map(function (seat) {
      return "Line " + seat.line + ", Seat " + seat.seatID;
    }).join(", ");
    movieTickets += '<div class="ticket"> \n      <div>' + movie.uuid + "</div>\n      <h1>" + movie.name + '</h1>\n      <img class="ticket__image" src="' + movie.image + '" />\n      <div class="ticket__screenDate">' + movie.screenDate + '</div> \n      <div class="ticket__screenTime">' + movie.screenTime + '</div>\n      <div class="ticket__venue">' + cinema.cinemaName + " - Venue " + movie.venue[0] + '</div> \n      <div class="ticket__seats">Selected Seats: ' + seats + "</div> \n    </div>";
  });
  var ticketContainer = document.querySelector(".ticket-container");
  ticketContainer.innerHTML = movieTickets;
};

function goToPayment() {
  setData("selectedSeats", selected);
  setData("orderMovie", selectedScreening);
  setData("cinemaSelected", selectedCinema);
  setData("movieDetails", selectedMovie);
}