import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
        <div>
            {products.map(product => (
                <div key={[product.productid, product.companyid]}>
                    <h2>{product.product_name}</h2>
                    {/* More product details here */}
                </div>
            ))}
        </div>
    );
}

export default ProductList;
