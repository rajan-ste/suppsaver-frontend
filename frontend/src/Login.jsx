import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Login.css';

function Login() {
    const [toggle, setToggle] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const toggleForm = () => {
        setToggle(!toggle);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Account created successfully!");
                console.log('User created');
                
            } else {
                console.log('Error creating user');
                toast.error("Error creating account")
                
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error("Error creating account")
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

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="email" name="email" onChange={handleChange} value={formData.email} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="password" name="password" onChange={handleChange} value={formData.password} required />
                    </div>  
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
