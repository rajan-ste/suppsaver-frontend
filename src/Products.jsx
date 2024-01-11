import { useState, useEffect } from 'react';
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
                return <div key={i} className='product'>
                            <figure>
                                <img className='product-image' src={item.image} alt={item.name}></img>
                                <figcaption>{item.name}</figcaption>
                            </figure>    
                        </div>
                        })}
                    </div>
        </>
    );
}

export default Products;