import './WatchlistButton.css'
import axios from '../../api/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function WatchlistButton () {

    let { productid } = useParams();
    
    const setWatchlistState = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/watchlist');
            const watchlistData = response.data;
            const isProductInWatchlist = watchlistData.some(product => product.productid == productid);
            setAdd(!isProductInWatchlist); 
        } catch (error) {
            console.error('Error fetching watchlist data: ', error);
        }
    };
    
    
    // true if product is not in watchlist, else false
    const [add, setAdd] = useState(setWatchlistState);

    const handleWatchlistAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/watchlist', { userid: null, productid: productid});
            setWatchlistState();
            console.log(response)
        } catch (error) {
            console.error('Watchlist add failed:', error);
        }
    }

    const handleWatchlistDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/watchlist', {
                data: { userid: null, productid: productid } 
            });
            await setWatchlistState();
            console.log(response)
        } catch (error) {
            console.error('Watchlist delete failed:', error);
        }
    }
    
    return (
        <>
            <button onClick={add ? handleWatchlistAdd : handleWatchlistDelete} className={add ? "watchlist-button-add" : "watchlist-button-delete"}>
                {add ? "Add to watchlist" : "Remove from watchlist"}</button>
        </>
    )
}

export default WatchlistButton