import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import SearchBar from './components/searchbar/Searchbar';
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

  return (
    <>
      <div className="page-title"><h1>Products</h1></div>
      <SearchBar onSearch={handleSearch} />
      <div className='wrapper'>
        {products.map((item, i) => (
          <Link to={"/products/" + item.id} className={item.price === 0 ? 'product-zero' : 'product'} key={i}>
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
