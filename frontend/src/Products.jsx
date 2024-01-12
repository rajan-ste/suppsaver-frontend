import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Products.css';


function Products () {
    const [product, getProduct] = useState([]);
    const API = 'http://localhost:8080/api/products';
    const fetchProduct = () => {
        fetch(API)
            .then ((res) => res.json())
            .then((res) => {
                console.log(res)
                getProduct(res)
            });
    }
    useEffect(() => {
        fetchProduct()
    }, []);
    return (
        <>
        <div className="page-title"><h1>Products</h1></div>
        <div><h1>search bar here</h1></div>
        <div className='wrapper'>
            {product.map((item, i) => {
                return <Link to={"/products/" + item.id} className={item.price === 0 ? 'product-zero' : 'product'} key={i}>
                            <figure>
                                <img className='product-image' src={item.image} alt={item.name}></img>
                                <figcaption>{item.name}</figcaption>
                                <figcaption className='prod-price'>{item.price === 0 ? "Product Unavailable" : `Best Price: $${item.price.toFixed(2)}`}</figcaption>
                            </figure>    
                        </Link>
                        })}
                    </div>        
        </>
    );  
}

export default Products;