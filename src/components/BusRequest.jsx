import React, { useState, useRef, useEffect } from 'react';
import './BusRequest.css';
import Navmenu from '../components/Navmenu';
import HeaderComponent  from '../components/Header';
import { addBus } from '../services/busService';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

function BusRequest() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [user,setUser] = useState(null);
  const  navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    // eslint-disable-next-line
  },[]);

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('inside handleSubmit');
    if(from === to){
      toast.current.show({severity:'error', summary: 'Error', detail:'From and To cannot be same!', life: 1000});
    }else{
      try {
        console.log('inside try');
        const response = await addBus(from,to,date,user.email);
        console.log('response',response);
        if(response.message === 'Bus Created!'){
          toast.current.show({severity:'success', summary: 'Success', detail:'Request Accepted!', life: 500});
          setTimeout(() => {
            navigate('/busreservation');
          }, 1000);
        }else{
          toast.current.show({severity:'error', summary: 'Error', detail:'Request Denied!', life: 1000});
        }
      } catch (error) {
        toast.current.show({severity:'error', summary: 'Error', detail:'Request Denied!', life: 1000});
        console.log('error',error);
  
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div className="bus-request-container">
       <div>
       <Toast ref={toast} />
       <HeaderComponent/>
       <Navmenu/>
      </div>
      <h2 style={containerStyle}>Bus Request Form</h2>
      {/* <form onSubmit={handleSubmit}> */}
        <div className="form-group">
          <label htmlFor="route">From:</label>
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
        <div className="form-group">
          <label htmlFor="route">To:</label>
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
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={handleDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
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
        <button type="submit" onClick={handleSubmit}>Submit Request</button>
      {/* </form> */}
    </div>
  );
}

export default BusRequest;