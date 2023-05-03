import { useState, useEffect, useRef } from "react";
import "./UpdateBookings.css"; // import the CSS file for styling
import { useParams } from 'react-router-dom';
import {searchBusById} from '../services/busService';
import { Toast } from 'primereact/toast';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';
import { useNavigate } from 'react-router-dom';

export const UpdateBooking = (props)  => {
    const toast = useRef(null);
    // state to track which seats are selected
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const {bus_id} = useParams();
    const seats = [];
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
  
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
        toast.current.show({severity:'error', summary: 'Error', detail:'Please select at least one seat to book.', life: 3000});
        return;
      }
      else{
        try {
          //const response = await createBooking(user.student_id,bus_id,user.email,selectedSeats);
          const response = [];
          if(response.message === 'Booking Done!'){
            toast.current.show({severity:'success', summary: 'Success', detail:'Booking Done!', life: 1000});
            setTimeout(() => {
              getBusDetails();
            }, 1000);
          }else{
            toast.current.show({severity:'error', summary: 'Error', detail:'Booking Failed!', life: 1000});
          }
        } catch (error) {
          toast.current.show({severity:'error', summary: 'Error', detail:'Booking Failed!', life: 1000});
          console.log('error',error);
  
        }
      }
      setSelectedSeats([]);
    };
  
    const getBusDetails = async () => {
      try {
        const response = await searchBusById(bus_id);
        if(response.message === 'Found'){
          toast.current.show({severity:'success', summary: 'Success', detail:'Bus Details Fetched!', life: 1000});
          setBookedSeats(response.bookedSeats);
        }
      } catch (error) {
        toast.current.show({severity:'error', summary: 'Error', detail:'Failed to fetch bus details.', life: 1000});
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
        <div className="first">
          <Toast ref={toast} />
          <div>
           <HeaderComponent/>
           <Navmenu/>
          </div>
          <h1>Bus</h1>
          <div className="second">
            {seats.map((row) => (
              <div key={`row-${row[0].row}`} className="row">
                {row.map((seat) => (
                  <div
                    key={`${seat.row}-${seat.seatNumber}`}
                    className={`third ${seat.booked ? "booked" : ""} ${
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
          <div className="book">
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

export default UpdateBooking;
  