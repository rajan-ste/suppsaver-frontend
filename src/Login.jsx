import { useState } from "react";
import './Login.css'

function Login () {

    const [toggle, setToggle] = useState(true);

    const toggleForm = () => {
        setToggle(!toggle);
    }

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

                <form action="/login" method="POST" className="login-form"></form>
                    <div className="input-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="email" name="email" required></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="password" name="password" required></input>
                    </div>
                    <div>
                        <button className="submit-button" type="submit">{toggle ? "Login" : "Register"}</button>
                    </div>
                </div>
        </>
    )
}

export default Login