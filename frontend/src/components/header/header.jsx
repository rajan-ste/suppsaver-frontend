import './header.css'
import userLogo from './../../assets/user.svg'
import { Link } from "react-router-dom";

function Header () {
    return (
        <>
        <header className='header'>
            <nav>
                <ul className='nav-left'>
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/products">Products</Link></li> 
                    <li><Link to="/admin">Admin</Link></li> 
                </ul>
                <Link to="/" className='logo'>Supp$aver</Link> 
                <div className='nav-right'>
                    <div className='user-wrapper'>
                        <Link to="/login"><img className='user' src={userLogo} alt="User Logo" /></Link>
                    </div>
                </div>
            </nav>
        </header>
        </>
    );
}

export default Header;
