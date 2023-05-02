import React, { useState, useRef } from "react";
import { signup } from '../services/signupService';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Toast } from 'primereact/toast';

export const Register = (props) => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [finalPass, setFinalPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(pass !== finalPass){
            toast.current.show({severity:'error', summary: 'Error', detail:'Password do not match!', life: 2000}); 
        }else{
            try {
                const response = await signup(email, pass, name);
                if(response){
                    toast.current.show({severity:'success', summary: 'Success', detail:'Login Successful!', life: 1000});
                    setTimeout((() => {
                        navigate('/');
                    }),1000)    
                }else{
                    toast.current.show({severity:'error', summary: 'Error', detail:'Signup Failed!', life: 1000});
                }
              } catch (error) {
                toast.current.show({severity:'error', summary: 'Error', detail:'Signup Failed!', life: 1000});
                console.log('error',error);
            }
        }  
    }

    return (
        <div className="app">
             <Toast ref={toast} />
            <div className="auth-form-container">
                <h1>Bus Seat Reservation</h1>
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="********" id="password" name="password" />
                <label htmlFor="password">Re-Enter-Password</label>
                <input value={finalPass} onChange={(e) => setFinalPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Sign Up</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/')}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}

export default Register;