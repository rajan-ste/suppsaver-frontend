import './Header.css'
import { Link } from "react-router-dom";
import userLogo from './../../assets/user.svg'
import AuthService from '../../services/AuthService';

function Header () {
    return (
        <>
        <header className='header'>
            <nav>
                <ul className='nav-left'>
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/products">Products</Link></li> 
                </ul>
                <Link to="/" className='logo'>Supp$aver</Link> 
                <div className='nav-right'>
                    <div className='user-wrapper'>
                        <Link to={AuthService.isAuthenticated() ? '/watchlist' : '/login'}><img className='user' src={userLogo} alt="User Logo" /></Link>
                    </div>
                </div>
            </nav>
        </header>
        </>
    );
}

export default Header;
