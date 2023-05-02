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
  const [route, setRoute] = useState("")
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());

  const handleRouteChange = (event) => {
    setRoute(event.target.value);
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


  const handleBook = async () => {
    if ( route === "" || from ===""|| to === "" || date === "") {
      toast.current.show({severity:'error', summary: 'Error', detail:'Please enter all details', life: 2000});
      return;
    }else{
      try {
        console.log('selected date ',date);
        const response = await searchBus(route,from,to,date);
        if(response.message === 'Found'){
            const busId = response.bus.bus_id;
            navigate(`/booking/${busId}`);  
        }else{
          toast.current.show({severity:'error', summary: 'Error', detail:'No bus found.', life: 1000});
        }
      } catch (error) {
        console.log('error',error);
        toast.current.show({severity:'error', summary: 'Error', detail:'No bus found.', life: 1000});
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
        <label>Route:</label>
        <select value={route} onChange={handleRouteChange}>
        <option value="">Select Route</option>
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
      <label>From:</label>
  {route === "Paradise" ? (
    <select value={from} onChange={handleFromChange}>
      <option value="">Select origin</option>
      <option value="Paradise1">Paradise1</option>
      <option value="Paradise2">Paradise2</option>
      <option value="Paradise3">Paradise3</option>
      <option value="Paradise4">Paradise4</option>
    </select>
  ) : route === "Route 40" ? (
    <select value={from} onChange={handleFromChange}>
      <option value="">Select origin</option>
      <option value="Route 40-1">Route 40-1</option>
      <option value="Route 40-2">Route 40-2</option>
      <option value="Route 40-3">Route 40-3</option>
      <option value="Route 40-4">Route 40-4</option>
    </select>
  ) : route === "Downtown" ? (
    <select value={from} onChange={handleFromChange}>
      <option value="">Select origin</option>
      <option value="Downtown1">Downtown1</option>
      <option value="Downtown2">Downtown2</option>
      <option value="Downtown3">Downtown3</option>
      <option value="Downtown4">Downtown4</option>
    </select>
    ) : route === "Catonsville" ? (
      <select value={from} onChange={handleFromChange}>
        <option value="">Select origin</option>
        <option value="Catonsville1">Catonsville1</option>
        <option value="Catonsville2">Catonsville2</option>
        <option value="Catonsville3">Catonsville3</option>
        <option value="Catonsville4">Catonsville4</option>
      </select>
      ) : route === "BWI MARC" ? (
        <select value={from} onChange={handleFromChange}>
          <option value="">Select origin</option>
          <option value="BWI MARC1">BWI MARC1</option>
          <option value="BWI MARC2">BWI MARC2</option>
          <option value="BWI MARC3">BWI MARC3</option>
          <option value="BWI MARC4">BWI MARC4</option>
        </select>
      ) : route === "Arundel" ? (
        <select value={from} onChange={handleFromChange}>
          <option value="">Select origin</option>
          <option value="Arundel1">Arundel1</option>
          <option value="Arundel2">Arundel2</option>
          <option value="Arundel3">Arundel3</option>
          <option value="Arundel4">Arundel4</option>
        </select>
        ) : route === "Arbutus" ? (
          <select value={from} onChange={handleFromChange}>
            <option value="">Select origin</option>
            <option value="Arbutus1">Arbutus1</option>
            <option value="Arbutus2">Arbutus2</option>
            <option value="Arbutus1">Arbutus3</option>
            <option value="Arbutus2">Arbutus4</option>
          </select>
  ) :(
    <select value={from} onChange={handleFromChange}>
      <option value="">Select origin</option>
      </select>
  )}
  
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
    </div>
    
  );
  
}

export default BusReservation;

