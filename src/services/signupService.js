export async function signup(username, password, name) {
    const response = await fetch('http://localhost:8000/user/add', {
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
  