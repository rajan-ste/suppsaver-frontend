import './Homepage.css';
import trainer from './assets/trainer.svg';

function HomePage () {
    return (
        <>
            <div className='box'>
                <div className='top-box'>
                    <h1>SuppSaver</h1>
                    <p>Find the best deal on your fitness supplements by comparing prices across three of New Zealand&apos;s largest supplement retailers.</p>
                    <p>Explore -&gt;</p>
                </div>
                <div className='middle-box'>
                    <img src={trainer}></img>
                </div>
            </div>
        </>
    )
}

export default HomePage;