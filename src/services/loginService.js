export async function login(username, password) {
    const response = await fetch('https://seat-reservation-backend-production.up.railway.app/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email:username, password:password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
}
  