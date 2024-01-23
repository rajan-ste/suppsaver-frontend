import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Products from './Products';
import Product from './Product';
import Login from './Login';
import Watchlist from './Watchlist';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productid" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
