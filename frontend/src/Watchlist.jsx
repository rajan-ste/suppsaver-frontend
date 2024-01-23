import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "./services/AuthService";

const Watchlist = () => {

    // redirect if user is not logged in
    const navigateTo = useNavigate();
    useEffect(() => {if (!AuthService.isAuthenticated()) {navigateTo("/login")}})
    

    const handleLogout = () => {
        AuthService.logout();
        navigateTo("/");
        console.log(AuthService.isAuthenticated())
    }

    return (
        <>
            <button onClick={handleLogout}>LOGOUT</button>
        </>
    )
};

export default Watchlist
