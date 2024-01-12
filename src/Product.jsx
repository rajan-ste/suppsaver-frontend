import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Product.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8080/api/products/product-company')
            .then(response => response.json())
            .then(data => {
                // Filter products by productId
                const filteredProducts = data.filter(product => product.productid == id);
                setProducts(filteredProducts);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]); 

    return (
        <>
        <div className="page-title"><h1>Products</h1></div>
        <div><h1>search bar here</h1></div>
        <div className='wrapper'>
            {products.map((product, i) => {
                return <div to={"/products/" + product.id} className={product.price === 0 ? 'product-zero' : 'product'} key={i}>
                            <figure>
                                <img className='product-image' src={product.image} alt={product.product_name}></img>
                                <figcaption>{product.product_name}</figcaption>
                                <figcaption className='prod-price'>{product.price === 0 ? "Product Unavailable" : `$${product.price.toFixed(2)}`}</figcaption>
                            </figure>    
                        </div>
                        })}
                    </div>        
        </>
    ); 
}

export default ProductList;
