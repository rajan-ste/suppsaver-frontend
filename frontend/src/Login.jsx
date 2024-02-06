import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import AuthService from './services/AuthService';
import axios from './api/api';
import "react-toastify/dist/ReactToastify.css";
import './Login.css';

function Login() {

    const navigateTo = useNavigate();
    useEffect(() => {if (AuthService.isAuthenticated()) {navigateTo("/watchlist")}})
    const [toggle, setToggle] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: ''
    });
    const [isMatch, setIsMatch] = useState(true);

    const toggleForm = () => {
        setToggle(!toggle);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === "password" || name === "confirm") {
            const passwordToCompare = name === "password" ? value : formData.password;
            const confirmPasswordToCompare = name === "confirm" ? value : formData.confirm;
            setIsMatch(passwordToCompare === confirmPasswordToCompare);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email: formData.email, password: formData.password });
            AuthService.login(response.data.token); 
            navigateTo("/watchlist")
        } catch (error) {
            console.error('Login failed:', error);
            toast.error("Login failed");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!isMatch) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Account created successfully!");
                console.log('User created');
                // check if email already exists
            } else if (response.status === 500) {
                const data = await response.json();
                const message = data.message || "";
                if (message.substring(0, 12) === "ER_DUP_ENTRY") {
                    toast.error("Email is already in use");
                }
            } else {
                console.log('Error creating user');
                toast.error("Error creating account");
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error("Error creating account");
        }
    };

    return (
        <>
            <div className="login-box">
                <h1 className="login-title">Join SuppSaver</h1>
                <div className="toggle-container">
                    <span className={toggle ? "toggle-text" : "untoggle-text"}>Login</span>
                    <div className="toggle-switch">
                        <input onClick={toggleForm} type="checkbox" id="toggle" className="toggle-checkbox" />
                        <label htmlFor="toggle" className="toggle-label"></label>
                    </div>
                    <span className={!toggle ? "toggle-text" : "untoggle-text"}>Register</span>
                </div>

                <form onSubmit={toggle ? handleLoginSubmit : handleRegisterSubmit} className="login-form">
                    <div className="input-group">
                        <input type="email" 
                               className="email"
                               name="email"
                               placeholder="Email"
                               onChange={handleChange} 
                               value={formData.email}
                               required />
                    </div>
                    <div className="input-group">
                        <input type="password"
                               className="password"
                               name="password"
                               placeholder="Password"
                               minLength={toggle ? 0 : 8} 
                               onChange={handleChange}
                               value={formData.password} 
                               required />
                    </div>  
                    {!toggle && (
                        <div className="input-group">
                            <input type="password"
                                   className="confirm-password"
                                   name="confirm"
                                   placeholder="Confirm Password"
                                   minLength={toggle ? 0 : 8}
                                   onChange={handleChange} 
                                   value={formData.confirm}
                                   required />
                        </div>
                    )}
                    <div>
                        <button className="submit-button" type="submit">{toggle ? "Login" : "Register"}</button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
