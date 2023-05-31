var selectionData = getData("cinemas")[1].movieList[1];
console.log(selectionData);
var movieInfo = getData("movieData").find(function (result) { return result.uuid === selectionData.movieID; });
var movieViewDetails = "\n<div>\n<lable>Movie Name: </lable></div>";
console.log(movieInfo);
function renderDetails(element, renderDetails) {
    element.innerHTML = renderDetails;
}
var html = document.querySelector(".venue_view");
var movieDetails = document.querySelector(".movie_details");
var venueData = [];
var selected = [];
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
    updateSeatTakenStatus(venueData, selectionData.seats.index);
    seatsRender(venueData);
})["catch"](function (error) { return console.log(error); });
function updateSeatTakenStatus(seats, selectionIndex) {
    seats.forEach(function (seat) {
        var foundIndex = selectionIndex.findIndex(function (data) { return seat.line === data.line && seat.seatID === data.seatID; });
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
    var _loop_1 = function (line) {
        var seatsPerLine = lineSeatsMap[line] || 0;
        var lineElement = document.createElement("div");
        lineElement.classList.add("venue__line");
        var _loop_2 = function (seat) {
            var foundSeat = seats.find(function (s) { return s.line === line && s.seatID === seat; });
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
            var seatIndex = selected.findIndex(function (rs) { return rs.line === line && rs.seat === seatID; });
            if (seatIndex !== -1) {
                selected.splice(seatIndex, 1); // Remove the selected seat from the array
                seat.style.backgroundColor = "white";
            }
            else {
                seat.style.backgroundColor = "blue";
                selected.push({
                    line: line,
                    seat: seatID
                });
            }
            console.log(selected);
        });
    });
}, 100);
