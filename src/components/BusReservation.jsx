import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import HeaderComponent  from '../components/Header';
import './BusReservation.css';
import {searchBus} from '../services/busService';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Navmenu from '../components/Navmenu';

function BusReservation() {
  const toast = useRef(null);
  const navigate = useNavigate();
 // const [name, setName] = useState("");
 // const [tickets, setTickets] = useState(0);
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


  const handleBook = async () => {
    if ( from ===""|| to === "" || date === "") {
      toast.current.show({severity:'error', summary: 'Error', detail:'Please enter all details', life: 2000});
      return;
    }else{
      try {
        console.log('selected date ',date);
        const response = await searchBus(from,to,date);
        if(response.message === 'Found'){
            const busId = response.bus.bus_id;
            navigate(`/booking/${busId}`);  
        }else{
          toast.current.show({severity:'error', summary: 'Error', detail:response.message, life: 1000});
        }
      } catch (error) {
        console.log('error',error);
        toast.current.show({severity:'error', summary: 'Error', detail:'Error', life: 1000});
      }
    }
  }//fix alert pro blem if any dropdown is empty they it should pop up alert
  

  return (
    <div>
      <Toast ref={toast} />
      <div>
       <HeaderComponent/>
       <Navmenu/>
      </div>
      <h1>Bus Search</h1>
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
      <div>
      <label>Time:</label>
        <select value={time} onChange={handleTimeChange}>
        <option value="">Select time</option>
        <option value="9:00 AM">9:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="3:00 PM">3:00 PM</option>
        <option value="4:00 PM">4:00 PM</option>
        <option value="5:00 PM">5:00 PM</option>
        <option value="6:00 PM">6:00 PM</option>
        <option value="7:00 PM">7:00 PM</option>
        </select>
      </div>
        <button onClick={handleBook}>Search Bus</button>
    </div>
    
  );
  
}

export default BusReservation;

