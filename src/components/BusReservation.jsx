import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import HeaderComponent  from '../components/Header';
import './BusReservation.css';
import {searchBus} from '../services/busService';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';

function BusReservation() {
  
  const navigate = useNavigate();
 // const [name, setName] = useState("");
 // const [tickets, setTickets] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [isFailed, setIsFailed] = useState(false);

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }

  const handleToChange = (event) => {
    setTo(event.target.value);
  }

  const handleDateChange = (date) => {
    setDate(date);
  }


  const handleBook = async () => {
    if ( from ===""|| to === "" || date === "") {
      alert("Please enter all details.");
      return;
    }else{
      try {
        console.log('selected date ',date);
        const response = await searchBus(from,to,date);
        if(response.message === 'Found'){
            const busId = response.bus.bus_id;
            navigate(`/booking/${busId}`);
            setIsFailed(false);
        }else{
          setIsFailed(true);
        }
      } catch (error) {
        console.log('error',error);
        setIsFailed(true);

      }
    }
  }//fix alert pro blem if any dropdown is empty they it should pop up alert
  

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
        <option value="Arbutus">Arbutus</option>
        <option value="Arundel">Arundel</option>
        <option value="BWI MARC">BWI MARC</option>
        <option value="Catonsville">Catonsville</option>
        <option value="Downtown">Downtown</option>
        <option value="Paradise">Paradise</option>
        <option value="Route 40">Route 40</option>
        </select>
      </div>
      <div>
        <label>To:</label>
        <select value={to} onChange={handleToChange}>
        <option value="">Select destination</option>
        <option value="Arbutus">Arbutus</option>
        <option value="Arundel">Arundel</option>
        <option value="BWI MARC">BWI MARC</option>
        <option value="Catonsville">Catonsville</option>
        <option value="Downtown">Downtown</option>
        <option value="Paradise">Paradise</option>
        <option value="Route 40">Route 40</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <DatePicker selected={date} onChange={handleDateChange} />
      </div>
        <button onClick={handleBook}>Search Bus</button>
        {isFailed && <Message severity="error" text="No bus found!"  />}
    </div>
    
  );
  
}

export default BusReservation;

