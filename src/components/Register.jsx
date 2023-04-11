import React, { useState } from "react";
import { signup } from '../services/signupService';
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [finalPass, setFinalPass] = useState('');
    const [name, setName] = useState('');
    const [signupFail, setSignupFail] = useState(false);
    const message = 'Sign up failed!';

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await signup(email, pass, name);
            if(response){
                navigate('/');
                setSignupFail(false);
            }
          } catch (error) {
            console.log('error',error);
            setSignupFail(true); 
        }
    }

    return (
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
            {signupFail && <p style={{ color: 'Red', fontSize:'40px', fontWeight:'bold' }}>{message}</p>}
        </form>
        <button className="link-btn" onClick={() => navigate('/')}>Already have an account? Login here.</button>
    </div>
    )
}

export default Register;