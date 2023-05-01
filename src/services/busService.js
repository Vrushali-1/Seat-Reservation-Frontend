export async function searchBus(from,to,travelDate) {
    const day = travelDate.getDate();
    travelDate.setDate(day - 1);
    const response = await fetch('http://localhost:8080/bus/find', {
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
  const response = await fetch('http://localhost:8080/bus/findbyId', {
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
  const response = await fetch('http://localhost:8080/bus/seats/find', {
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
  