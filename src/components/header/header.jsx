import './header.css'
import userLogo from './../../assets/user.svg'

function Header () {
    return (
        <>
        <header className='header'>
            <nav>
                <ul className='nav-left'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Admin</a></li>
                </ul>
            <h1 className='logo' href="#">Supp$aver</h1>
            <div className='nav-right'>
                <img className='user' src={userLogo} alt="User Logo" />
            </div>
            </nav>
        </header>
        </>
    );
}

export default Header