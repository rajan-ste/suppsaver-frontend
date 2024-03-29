import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import axios from './api/api';
import './Watchlist.css';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const navigateTo = useNavigate();

    const handleWatchDelete = async (productid) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/watchlist`, {
                data: { userid: null, productid: productid } 
            });
            console.log(response);
            setWatchlist(watchlist.filter(item => item.productid !== productid));
        } catch (error) {
            console.error('Watchlist delete failed:', error);
        }
    };

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            navigateTo("/login");
        }
    }, [navigateTo]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/watchlist`)
            .then(response => {
                setWatchlist(response.data); 
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        navigateTo("/");
    };

    return (
        <>
            <h1 className="watchlist-heading">Watchlist</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {watchlist.length > 0 ? (
                <div className="watchlist-wrapper">
                    {watchlist.map((item, i) => (
                        <Product
                            productid={item.productid}
                            key={i}
                            handleDelete={() => handleWatchDelete(item.productid)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-wrapper">
                    <h2 className="empty-watchlist">Your watchlist is empty, add some products {<Link to="/products">here</Link>}</h2>
                </div>
            )}
        </>
    );
}

function Product({ productid, handleDelete }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(response => response.json())
            .then(data => {
                const foundProduct = data.find(product => product.id === productid);
                setProduct(foundProduct);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, [productid]);

    if (!product) return null;

    return (
        <div className="watchlist-prod">
            <p className="watch-product-name">{product.name}</p>
            <p className="watch-product-price">
                {product.price === 0 ? "Not available" : `$${product.price.toFixed(2)}`}
            </p>
            <img className="watch-product-image" src={product.image} alt={product.name} />
            <Link to={"/products/" + productid}><button className="watch-product-link">&#8594;</button></Link>
            <button className="watch-delete-button" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Watchlist;
