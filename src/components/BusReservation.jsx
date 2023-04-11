import React, { useState } from 'react';

function BusReservation() {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleTicketsChange = (event) => {
    setTickets(event.target.value);
  }

  const handleBook = () => {
    if (name === "" || tickets === 0) {
      alert("Please enter name and tickets required.");
      return;
    }
    alert(`Reservation details: \n Name: ${name} \n Tickets: ${tickets}`);
  }

  return (
    <div>
      <h1>Bus Reservation Page</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Tickets Required:</label>
        <input type="number" value={tickets} onChange={handleTicketsChange} />
      </div>
      <button onClick={handleBook}>Book</button>
    </div>
  );
}

export default BusReservation;