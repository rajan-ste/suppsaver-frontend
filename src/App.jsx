import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import Header from './components/header/header'
import './App.css'

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App
