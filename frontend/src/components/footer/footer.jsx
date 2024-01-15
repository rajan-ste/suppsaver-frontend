import './Footer.css';
import reactLogo from './../../assets/react.svg';
import nodeLogo from './../../assets/node.svg';
import sqlLogo from './../../assets/mysql.svg';

function Footer () {
    return (
        <>
        <footer className='footer'>
            <div>
                <p>Powered by</p>
                <img src={reactLogo} alt="React Logo" className='react-logo'></img>
                <img src={nodeLogo} alt="Nodejs Logo" className='node-logo'></img>
                <img src={sqlLogo} alt="MySQL Logo" className='sql-logo'></img>
            </div>
        </footer>
        </>
    );
}

export default Footer;