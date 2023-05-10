export async function searchBus(from,to,travelDate) {
    const day = travelDate.getDate();
    travelDate.setDate(day - 1);
    const response = await fetch('https://seat-reservation-backend-production.up.railway.app/bus/find', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departure:from, destination:to,travel_date:travelDate }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
}

export async function searchBusById(busId) {
  const response = await fetch('https://seat-reservation-backend-production.up.railway.app/bus/findbyId', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bus_id:busId }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}

export async function getSeats() {
  const response = await fetch('https://seat-reservation-backend-production.up.railway.app/bus/seats/find', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}

export async function addBus(from, to, travelDate, email) {
  const newDate = new Date(travelDate);
  const day = newDate.getDate();
  newDate.setDate(day - 1);
  const response = await fetch('https://seat-reservation-backend-production.up.railway.app/bus/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departure:from, destination:to,travel_date:newDate, email:email }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}
  