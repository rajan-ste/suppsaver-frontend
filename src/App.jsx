import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Products from './Products';
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
