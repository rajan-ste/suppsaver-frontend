import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Login.css';

function Login() {
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

    const handleLoginSubmit = async () => {
        console.log("Login submit logic here");
        // Login submit logic
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!isMatch) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Account created successfully!");
                console.log('User created');
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
