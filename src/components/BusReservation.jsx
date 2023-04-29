import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import HeaderComponent  from '../components/Header';
import './BusReservation.css';

function BusReservation() {
  

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("09:00");

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleTicketsChange = (event) => {
    setTickets(event.target.value);
  }

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }

  const handleToChange = (event) => {
    setTo(event.target.value);
  }

  const handleDateChange = (date) => {
    setDate(date);
  }

  const handleTimeChange = (time) => {
    setTime(time);
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
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>No of tickets:</label>
        <input type="number" value={tickets} onChange={handleTicketsChange} />
      </div>
      <div>
        <label>From:</label>
        <input type="text" value={from} onChange={handleFromChange} />
      </div>
      <div>
        <label>To:</label>
        <input type="text" value={to} onChange={handleToChange} />
      </div>
      <div>
        <label>Date:</label>
        <DatePicker selected={date} onChange={handleDateChange} />
      </div>
      <div>
        <label>Time:</label>
        <TimePicker value={time} onChange={handleTimeChange} disableClock format="HH:mm" minTime="09:00" maxTime="21:00" step={60} />
      </div>
      <button onClick={handleBook}>Book</button>
    </div>
  );
}

export default BusReservation;

