import React, { useState } from "react";
import { login } from './services/loginService';



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFail, setLoginFail] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        try {
            const response = await login(email, pass);
            if(response.message == 'Successfully Logged In!'){
                setLoginSuccess(true);  
                setLoginFail(false);
            }
          } catch (error) {
            console.log('error',error);
            setLoginFail(true);
            setLoginSuccess(false);  
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Bus Seat Reservation</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Id</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="campusID@umbc.edu" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
                {loginSuccess && <p style={{ color: 'green', fontSize:'40px', fontWeight:'bold' }}>Login Successful!</p>}
                {loginFail && <p style={{ color: 'red', fontSize:'40px', fontWeight:'bold' }}>Login Failed!</p>}

            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}