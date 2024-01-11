import './Homepage.css';
import trainer from './assets/trainer.svg';
import { Link } from "react-router-dom";

function HomePage () {
    return (
        <>
            <div className='box'>
                <div className='top-box'>
                    <h1>SuppSaver</h1>
                    <p>Find the best deal on your fitness supplements by comparing prices across three of New Zealand&apos;s largest supplement retailers.</p>
                    <Link to="products" className='explore'>Explore &#8594;</Link>
                </div>
                <div className='middle-box'>
                    <img src={trainer}></img>
                </div>
            </div>
        </>
    )
}

export default HomePage;