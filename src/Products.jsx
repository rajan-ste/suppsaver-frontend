import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import SearchBar from './components/searchbar/SearchBar';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const API = 'http://localhost:8080/api/products';

  const fetchProducts = useCallback((searchTerm = '', isSearch = false) => {
    fetch(isSearch ? `${API}/search?term=${searchTerm}` : API)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, [API]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback((query) => {
    fetchProducts(query, query !== '');
  }, [fetchProducts]);

  const sortLowToHigh = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.price === 0) return 1;
      if (b.price === 0) return -1;
      return a.price - b.price;
    });
    setProducts(sortedProducts);
  };
  
  const sortHighToLow = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.price === 0) return 1;
      if (b.price === 0) return -1;
      return b.price - a.price;
    });
    setProducts(sortedProducts);
  };
  
  return (
    <>
      <div className="page-title"><h1>Products</h1></div>
      <SearchBar onSearch={handleSearch} />
      <div className="sorting-buttons">
        <button className='sorting-button' onClick={sortLowToHigh}>Sort Price Low to High</button>
        <button className='sorting-button' onClick={sortHighToLow}>Sort Price High to Low</button>
      </div>
      <div className='wrapper'>
        {products.map((item, i) => (
          <Link to={"/products/" + item.id } className={item.price === 0 ? 'product-zero' : 'product'} key={i} target="_blank">
            <figure>
              <img className='product-image' src={item.image} alt={item.name} />
              <figcaption>{item.name}</figcaption>
              <figcaption className='prod-price'>{item.price === 0 ? "Product Unavailable" : `Best Price: $${item.price.toFixed(2)}`}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
