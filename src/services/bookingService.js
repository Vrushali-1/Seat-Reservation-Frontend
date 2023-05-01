export async function createBooking(studentId,busId,email,seats) {
    const response = await fetch('https://seat-reservation-backend-production.up.railway.app/booking/seatbooking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id:studentId,bus_id:busId,email:email,seats:seats }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
}