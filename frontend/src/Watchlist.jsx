import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "./services/AuthService";
import axios from './api/api'

const Watchlist = () => {

    const [products, setProducts] = useState([])
    
    // redirect if user is not logged in
    const navigateTo = useNavigate();
    useEffect(() => {if (!AuthService.isAuthenticated()) {navigateTo("/login")}})
    
    const handleLogout = () => {
        AuthService.logout();
        navigateTo("/");
        console.log(AuthService.isAuthenticated())
    }

    useEffect(() => {
        // Fetch data from API
        axios.get('http://localhost:8080/api/watchlist')
            .then(response => {
                setProducts(response.data); // response.data contains the JSON response
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return (
        <>
            <h1 className="watchlist-heading">Watchlist</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {products.map((product, i) => {
                return <p key={i}>{product.productid}</p>
            })}
        </>
    )
};

export default Watchlist
