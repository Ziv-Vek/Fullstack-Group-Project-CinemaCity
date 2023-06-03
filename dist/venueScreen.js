// Present screening details in Navbar -
var selectedScreeningRaw = getData("selectedMovie").split(", ");
var cinemas = getData("cinemaData");
var selectedCinema = cinemas.find(function (result) { return result.id === Number(selectedScreeningRaw[1]); });
var movies = getData("movieData");
var selectedMovie = movies.find(function (result) { return result.uuid === Number(selectedScreeningRaw[0]); });
var selectedScreening = selectedCinema.movieList.find(function (result) { return result.uuid === Number(selectedScreeningRaw[3]); });
console.log(selectedScreening);
function renderDetails(element, renderDetails) {
    element.innerHTML = renderDetails;
}
var venueData = [];
// Render screening in navbar -
var renderScreeningInNavbar = function (selectedMovie, selectedCinema, selectedScreening) {
    var screeningDate = new Date(selectedScreening.screenDate);
    var dateString = screeningDate.toLocaleString("default", {
        weekday: "long",
        day: "2-digit",
        month: "short"
    });
    console.log(selectedScreening);
    screeningDetails.innerHTML = "<img\n  src=\"" + selectedMovie.image + "\"\n  class=\"screening__movie-img\" />\n  <div class=\"screening__text-container\">\n  <p class=\"screening__text-container__title\">" + selectedMovie.name + "</p>\n  <p class=\"screening__text-container__details\">" + selectedCinema.cinemaName + "</p>\n  <p class=\"screening__text-container__details\">" + dateString + ", " + selectedScreening.screenTime + " </p>\n  <p class=\"screening__text-container__details\">Venue " + selectedScreening.venue + " </p>\n  </div>";
};
renderScreeningInNavbar(selectedMovie, selectedCinema, selectedScreening);
// Selected seats -
var selectedSeats = [];
fetch("venue.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    var venue = data[0];
    venue.seats.forEach(function (seat) {
        venueData.push({
            line: seat.line,
            seatID: seat.seatID,
            isTaken: seat.isTaken
        });
    });
    updateSeatTakenStatus(venueData, selectedScreening.seats.index);
    seatsRender(venueData);
    enableSeatsSelection();
})["catch"](function (error) { return console.log(error); });
// Taken seats status -
function updateSeatTakenStatus(seats, selectionIndex) {
    seats.forEach(function (seat) {
        var foundIndex = selectionIndex.findIndex(function (data) { return seat.line === data.line && seat.seatID === data.seatID; });
        seat.isTaken = foundIndex !== -1;
    });
}
var lineSeatsMap = {
    1: 10,
    2: 10,
    3: 10,
    4: 12,
    5: 14,
    6: 14
};
// Render seats -
function seatsRender(seats) {
    var lineElements = [];
    var _loop_1 = function (line) {
        var seatsPerLine = lineSeatsMap[line] || 0;
        var lineElement = document.createElement("div");
        lineElement.classList.add("venue__line");
        var _loop_2 = function (seat) {
            var foundSeat = seats.find(function (s) { return s.line === line && s.seatID === seat; });
            var isSelected = selectedSeats.some(function (s) { return s.line === line && s.seat === seat; });
            var isTaken = foundSeat ? foundSeat.isTaken : false;
            seatsRenderTaken(isTaken, isSelected, lineElement, seat, line);
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
// Render taken seats -
function seatsRenderTaken(isTaken, isSelected, element, seat, line) {
    var seatElement = document.createElement("div");
    seatElement.classList.add("venue__seat");
    seatElement.classList.add(line + "-" + seat);
    seatElement.textContent = "" + seat;
    if (isTaken) {
        seatElement.classList.replace("venue__seat", "venue__seat--taken");
    }
    else if (isSelected) {
        seatElement.style.backgroundColor = "rgb(150, 247, 140)";
    }
    element.appendChild(seatElement);
}
// Seat selection -
var enableSeatsSelection = function () {
    var allSeats = document.querySelectorAll(".venue__seat");
    allSeats.forEach(function (seat) {
        seat.addEventListener("click", function () {
            var selectedSeat = seat.classList[1].split("-");
            var line = Number(selectedSeat[0]);
            var seatID = Number(selectedSeat[1]);
            var seatIndex = selectedSeats.findIndex(function (rs) { return rs.line === line && rs.seat === seatID; });
            var isSeatTaken = seat.classList.contains("venue__seat--taken");
            if (isSeatTaken) {
                return seatErrorMessage;
            }
            if (seatIndex !== -1) {
                selectedSeats.splice(seatIndex, 1); // Remove the selected seat from the array
                seat.style.backgroundColor = "white";
            }
            else {
                seat.style.backgroundColor = "rgb(150, 247, 140)";
                selectedSeats.push({
                    line: line,
                    seat: seatID
                });
            }
            console.log(selectedSeats);
        });
    });
};
// Order tickets button -
orderBtn.addEventListener("click", function () {
    if (selectedSeats.length === 0) {
        seatErrorMessage.style.display = "block";
    }
    else if (selectedSeats.length > 5) {
        tooManySeatsMessage.style.display = "block";
    }
    else {
        seatErrorMessage.style.display = "none";
        tooManySeatsMessage.style.display = "none";
        paymentForm.style.display = "block";
    }
});
// Event form -
var events = [];
var handleEventForm = function (evt) {
    try {
        evt.preventDefault();
        var name = evt.target.elements.name.value;
        var email = evt.target.elements.email.value;
        var number = parseInt(evt.target.elements.number.value);
        if (isNaN(number)) {
            numbersOnly.style.display = "block";
            return;
        }
        else if (!/^[a-zA-Z]+$/.test(name)) {
            textOnly.style.display = "block";
            return;
        }
        else if (!isValidEmail(email)) {
            validEmail.style.display = "block";
            return;
        }
        events.push(new EventForm(name, email, number.toString()));
        console.dir(events);
        evt.target.reset();
        closeMessage();
        thanksMessage.style.display = "block";
    }
    catch (error) {
        console.log(error);
    }
};
// Payment form -
var forms = [];
var handlePaymentForm = function (evt) {
    try {
        evt.preventDefault();
        paymentForm.style.display = "none";
        loadingContainer.style.display = "block";
        var name = evt.target.elements.name.value;
        var email = evt.target.elements.email.value;
        var idNumber = parseInt(evt.target.elements.idNumber.value, 10);
        var cardNumber = parseInt(evt.target.elements.cardNumber.value, 10);
        var month = parseInt(evt.target.elements.month.value, 10);
        var year = parseInt(evt.target.elements.year.value, 10);
        if (isNaN(idNumber) || isNaN(cardNumber) || isNaN(month) || isNaN(year)) {
            notNumberMessage.style.display = "block";
            paymentForm.style.display = "block";
            loadingContainer.style.display = "none";
            return;
        }
        forms.push(new PayForm(name, email, idNumber.toString(), cardNumber.toString(), month, year));
        console.dir(forms);
        notNumberMessage.style.display = "none";
        setTimeout(function () {
            loadingContainer.style.display = "none";
            displayMovieTicket();
        }, 10000);
    }
    catch (error) {
        console.log(error);
    }
};
// Render movie tickets after purchase -
var displayMovieTicket = function () {
    var selectedLines = selectedSeats.reduce(function (lines, seat) {
        if (!lines.includes(seat.line)) {
            lines.push(seat.line);
        }
        return lines;
    }, []);
    var ticketHTML = "\n <div class=\"ticket\">\n     <img class=\"ticket__TImage\" src=\"./assets/ticket-no-bg.png\" />\n\n     <span onclick=\"closeTicket()\" class=\"material-symbols-outlined ticket__exit\">\n       close\n     </span>\n\n     <div class=\"ticket__image\">\n     <img src=\"" + selectedMovie.image + "\" />\n     </div>\n   \n    <div class=\"ticket__Details\">\n        <h2 class=\"ticket__name\">" + selectedMovie.name + "</h2>\n\n        <div class=\"ticket__screenDate1\">" + selectedScreening.screenDate + "</div>\n        <div class=\"ticket__screenTime1\">" + selectedScreening.screenTime + "</div>\n        <div class=\"ticket__cinema\"> Cinema " + selectedCinema.cinemaName + " </div>\n        <img class=\"ticket__scan1\" src=\"../assets/scanTicket.png\" />\n    \n       <div class=\"ticket__screenDate2\">" + selectedScreening.screenDate + "</div>\n       <div class=\"ticket__screenTime2\">" + selectedScreening.screenTime + "</div>\n\n       <span class=\"ticket__labelVenue\"> Venue </span>\n       <span class=\"ticket__labelLine\"> Line </span>\n       <span class=\"ticket__labelSeats\"> Seats </span>\n\n        <div class=\"ticket__venue\"> " + selectedScreening.venue + "</div>\n        <div class=\"ticket__line\"> " + selectedLines.join(", ") + "</div>\n        <div class=\"ticket__seats\"> " + selectedSeats
        .map(function (seat) { return "" + seat.seat; })
        .join(", ") + " </div>\n\n        <img class=\"ticket__scan2\" src=\"../assets/scanTicket.png\" />\n\n        <span class=\"ticket__mailMessage\"> A Copy Of Your Tickets Was Sent To Your Email ! </span>\n    </div>\n  </div>";
    // Reset selectedSeats array
    selectedSeats.length = 0;
    // Reset seat background color
    var allSeats = document.querySelectorAll(".venue__seat");
    allSeats.forEach(function (seat) {
        seat.style.backgroundColor = "white";
    });
    // Clear all input fields in the payment form
    var formInputs = paymentForm.querySelectorAll("input:not([type='submit'])");
    formInputs.forEach(function (input) {
        input.value = "";
    });
    ticketContainer.innerHTML = ticketHTML;
    ticketContainer.style.display = "block";
    paymentForm.style.display = "none";
};
// Helpful functions -
function closeTicket() {
    document.querySelector(".ticket ").remove();
}
function closeMessage() {
    tooManySeatsMessage.remove();
}
function closeThanksMessage() {
    thanksMessage.remove();
}
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
