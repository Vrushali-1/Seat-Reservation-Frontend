export async function signup(username, password, name) {
    const response = await fetch('https://seat-reservation-backend-production.up.railway.app/user/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password:password,name:name }),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
}
  