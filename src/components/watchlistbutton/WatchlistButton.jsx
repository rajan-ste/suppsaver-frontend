import axios from '../../api/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './WatchlistButton.css';

function WatchlistButton() {
    let { productid } = useParams();
    const [add, setAdd] = useState(true);

    /**
     * Fetches the user's watchlist from the database and updates the state to reflect
     * whether a specific product is in the watchlist. This function makes an asynchronous 
     * HTTP GET request to retrieve the watchlist data. It then checks if the specified 
     * product is in the fetched watchlist and updates the state accordingly.
     * 
     * 
     * @async
     * @function setWatchlistState
     * @throws {Error} Throws an error if the HTTP request fails.
     */
    const setWatchlistState = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/watchlist`);
            const watchlistData = response.data;
            const isProductInWatchlist = watchlistData.some(product => product.productid == productid);
            setAdd(!isProductInWatchlist);
        } catch (error) {
            console.error('Error fetching watchlist data: ', error);
        }
    };

    // Use useEffect to update the state when the component mounts or productid changes
    useEffect(() => {
        setWatchlistState();
    }, [productid]);

    /**
     * Inserts a selected product into the user's watchlist.
     * This function makes an asynchronous request to the server to insert a product
     * to the user's watchlist. It then updates the local state to reflect this change.
     * 
     * @async
     * @function handleWatchlistAdd
     * @param {number} productid - The ID of the product to be added to the watchlist.
     */
    const handleWatchlistAdd = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/watchlist`, { userid: null, productid: productid });
            setWatchlistState();
        } catch (error) {
            console.error('Watchlist add failed:', error);
        }
    };

    /**
     * Deletes a selected product from the user's watchlist in the database.
     * This function makes an asynchronous request to the server to remove a product
     * from the user's watchlist. It then updates the local state to reflect this change.
     * 
     * @async
     * @function handleWatchlistDelete
     * @param {number} productid - The ID of the product to be removed from the watchlist.
     */
    const handleWatchlistDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/watchlist`, {
                data: { userid: null, productid: productid }
            });
            setAdd(true)
        } catch (error) {
            console.error('Watchlist delete failed:', error);
        }
    };

    return (
        <button onClick={add ? handleWatchlistAdd : handleWatchlistDelete} 
                className={add ? "watchlist-button-add" : "watchlist-button-delete"}>
            {add ? "Add to watchlist" : "Remove from watchlist"}
        </button>
    );
}

export default WatchlistButton;
