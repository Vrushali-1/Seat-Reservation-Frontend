import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import HeaderComponent  from '../components/Header';
import './BusReservation.css';

function BusReservation() {
  

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");


  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }

  const handleToChange = (event) => {
    setTo(event.target.value);
  }

  const handleDateChange = (date) => {
    setDate(date);
  }
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  }



  const handleBook = () => {
    if (name === "" || tickets === 0 || from === "" || to === "") {
      alert("Please enter all details.");
      return;
    }
    alert(`Reservation details: \n Name: ${name} \n Tickets: ${tickets} \n From: ${from} \n To: ${to} \n Date: ${date.toLocaleDateString()} \n Time: ${time}`);
  }
  

  return (
    <div>
      <h1>Bus Reservation Page</h1>
      <div>
      <HeaderComponent/>
    </div>
      
      <div>
        <label>From:</label>
        <select value={from} onChange={handleFromChange}>
        <option value="">Select origin</option>
        <option value="Arb">Arbutus</option>
        <option value="Aru">Arundel</option>
        <option value="Bwi">BWI MARC</option>
        <option value="Cat">Catonsville</option>
        <option value="Dow">Downtown</option>
        <option value="Par">Paradise</option>
        <option value="Rou">Route 40</option>
        </select>
      </div>
      <div>
        <label>To:</label>
        <select value={to} onChange={handleToChange}>
        <option value="">Select destination</option>
        <option value="Arb">Arbutus</option>
        <option value="Aru">Arundel</option>
        <option value="Bwi">BWI MARC</option>
        <option value="Cat">Catonsville</option>
        <option value="Dow">Downtown</option>
        <option value="Par">Paradise</option>
        <option value="Rou">Route 40</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <DatePicker selected={date} onChange={handleDateChange} />
      </div>
      <div>
      <label>Time:</label>
        <select value={time} onChange={handleTimeChange}>
        <option value="">Select time</option>
        <option value="A">9:00 AM</option>
        <option value="B">10:00 AM</option>
        <option value="C">11:00 AM</option>
        <option value="D">12:00 PM</option>
        <option value="E">1:00 PM</option>
        <option value="F">3:00 PM</option>
        <option value="G">4:00 PM</option>
        <option value="H">5:00 PM</option>
        <option value="I">6:00 PM</option>
        <option value="J">7:00 PM</option>
        </select>
      </div>
      <button onClick={handleBook}>Book</button>
    </div>
  );
}

export default BusReservation;

