import './WatchlistButton.css'
import axios from '../../api/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function WatchlistButton () {

    let { productid } = useParams();

    // true if product is not in watchlist, else false
    

    const setWatchlistState = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/watchlist');
            const watchlistData = response.data;
            const filteredData = watchlistData.filter(product => product.productid == productid)
            filteredData.length > 0 && setAdd(false)
            console.log(filteredData);
        } catch (error) {
            console.error('Error fetching watchlist data: ', error);
        }
    }
    
    const [add, setAdd] = useState(setWatchlistState);

    const handleWatchlistAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/watchlist', { userid: null, productid: productid});
            console.log(response)
        } catch (error) {
            console.error('Watchlist add failed:', error);
        }
    }

    return (
        <>
            <button onClick={handleWatchlistAdd} className="watchlist-button">{add ? "Add to watchlist" : "Remove from watchlist"}</button>
        </>
    )
}

export default WatchlistButton