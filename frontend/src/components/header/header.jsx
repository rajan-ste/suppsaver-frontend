import './header.css'
import userLogo from './../../assets/user.svg'

function Header () {
    return (
        <>
        <header className='header'>
            <nav>
            <ul className='nav-left'>
                <li><a>Home</a></li>
                <li><a>Products</a></li>
                <li><a>Admin</a></li>
            </ul>
            <h1 className='logo'>Supp$aver</h1>
            <div className='nav-right'>
                <img className='user' src={userLogo} alt="User Logo" />
            </div>
            </nav>
        </header>
        </>
    );
}

export default Header