import { useState } from "react";
import "./BusSearch.css"; // import the CSS file for styling

const ROWS = 5; // number of rows in the bus
const SEATS_PER_ROW = 4; // number of seats per row

function Bus() {
  // state to track which seats are selected
  const [selectedSeats, setSelectedSeats] = useState([]);

  // function to handle seat selection
  const handleSeatSelect = (seat) => {
    if (seat.booked) {
      alert("This seat is already booked.");
      return;
    }

    const index = selectedSeats.findIndex(
      (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.seatNumber === seat.seatNumber
    );

    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    }
  };

  // function to handle booking confirmation
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }

    // TODO: Implement booking logic here

    alert(`You have successfully booked ${selectedSeats.length} seat(s): ${selectedSeats.map((seat) => `${seat.row}${seat.seatNumber}`).join(", ")}`);
    setSelectedSeats([]);
  };

  const ROWS = 4; // number of rows in the bus
  const SEATS_PER_ROW = 5; // number of seats per row
  
  const seats = [];
  for (let row = 1; row <= ROWS; row++) {
    const seats1 = [];
    for (let seatNumber = 1; seatNumber <= SEATS_PER_ROW; seatNumber++) {
      seats1.push({ row, seatNumber, booked: false });
    }
    seats.push(seats1);
  }
  
  return (
    <div className="bus">
      <h1>Bus</h1>
      <div className="seats">
        {seats.map((row) => (
          <div key={`row-${row[0].row}`} className="row">
            {row.map((seat) => (
              <div
                key={`${seat.row}-${seat.seatNumber}`}
                className={`seat ${seat.booked ? "booked" : ""} ${
                  selectedSeats.findIndex(
                    (selectedSeat) =>
                      selectedSeat.row === seat.row && selectedSeat.seatNumber === seat.seatNumber
                  ) !== -1
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSeatSelect(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="booking">
        <button className="confirm-button" onClick={handleBooking}>
          Confirm Booking
        </button>
        <p>
          Selected seats:{" "}
          {selectedSeats.map((seat) => `${seat.row}${seat.seatNumber}`).join(", ")}
        </p>
      </div>
    </div>
  );
  
}

export default Bus;
