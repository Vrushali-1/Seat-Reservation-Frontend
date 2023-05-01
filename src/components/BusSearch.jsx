import { useState, useEffect } from "react";
import "./BusSearch.css"; // import the CSS file for styling
import { useParams } from 'react-router-dom';
import {searchBusById} from '../services/busService';
import { createBooking } from '../services/bookingService';
import { Message } from 'primereact/message';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';


// const ROWS = 5; // number of rows in the bus
// const SEATS_PER_ROW = 4; // number of seats per row

export const Bus = (props) => {
  // state to track which seats are selected
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const {bus_id} = useParams();
  const seats = [];
  const [user,setUser] = useState(null);
  const [bookingFail, setBookingFail] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  useEffect(() => {
    // Call your method here
    getBusDetails();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [props]);

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
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats.splice(index, 1);
      setSelectedSeats(updatedSelectedSeats);
    }
  };

  // function to handle booking confirmation
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }
    else{
      try {
        const response = await createBooking(user.student_id,bus_id,user.email,selectedSeats);
        if(response.message === 'Booking Done!'){
          setBookingSuccess(true);
          setTimeout(() => {
            getBusDetails();
          }, 1000);
          setBookingFail(false);
        }else{
          setBookingFail(true);
          setBookingSuccess(false);
        }
      } catch (error) {
        console.log('error',error);

      }
    }
    setSelectedSeats([]);
  };

  const getBusDetails = async () => {
    setBookingSuccess(false);
    setBookingFail(false);
    try {
      const response = await searchBusById(bus_id);
      if(response.message === 'Found'){
        setBookedSeats(response.bookedSeats);
      }
    } catch (error) {
      console.log('error',error);
    }
  }

    const ROWS = 4; // number of rows in the bus
    const SEATS_PER_ROW = 5; // number of seats per row
    let count = 1;
    for (let row = 1; row <= ROWS; row++) {
      const seats1 = [];
      for (let seatNumber = 1; seatNumber <= SEATS_PER_ROW; seatNumber++) {
        let isBooked = false;
        let bookedSeatIndex;
        if(bookedSeats){
          bookedSeatIndex = bookedSeats.findIndex(
            (busSeat) => busSeat.seat_id === count
          );
        }
        if (bookedSeatIndex !== -1) {
          isBooked = true;
        }
        seats1.push({ row, seatNumber, booked: isBooked,seat_id:count,seat_name:`S${count}` });
        count++;
      }
      seats.push(seats1);
    }  

  return (
    <div className="bus">
      <div>
       <HeaderComponent/>
       <Navmenu/>
      </div>
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
                {seat.seat_name}
              </div>
            ))}
          </div>
        ))}
      </div>
      {bookingFail && <Message severity="error" text="Booking Failed!" />}
      {bookingSuccess && <Message severity="success" text="Booking Successful!" />}
      <div className="booking">
        <button className="confirm-button" onClick={handleBooking}>
          Confirm Booking
        </button>
        <p>
          Selected seats:{" "}
          {selectedSeats.map((seat) => `${seat.seat_name}`).join(", ")}
        </p>
      </div>
    </div>
  );
  
}

export default Bus;
