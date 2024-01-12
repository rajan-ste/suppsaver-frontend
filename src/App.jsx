import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Products from './Products';
import Product from './Product';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
