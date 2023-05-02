import React, { useState, useRef } from "react";
import { login } from '../services/loginService';
import { useNavigate } from 'react-router-dom';
import './Login.component.css';
import { Toast } from 'primereact/toast';
        

export const Login = (props) => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, pass);
            if(response.message === 'Successfully Logged In!'){
                toast.current.show({severity:'success', summary: 'Success', detail:'Login Successful!', life: 1000});
                localStorage.setItem("user", JSON.stringify(response.user));
                setTimeout(() => {
                    navigate('/busreservation');
                  }, 1000);
            }
            else{
                toast.current.show({severity:'error', summary: 'Error', detail:'Login Failed!', life: 1000});
            }
          } catch (error) {
            toast.current.show({severity:'error', summary: 'Error', detail:'Login Failed!', life: 1000});
            console.log('error',error);
        }
    }

    return (
        <div className="app">
            <Toast ref={toast} />
            <div className="auth-form-container">
            <h1>Bus Seat Reservation</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Id</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="campusID@umbc.edu" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
            </div>
        </div>
        
    )
}

export default Login;