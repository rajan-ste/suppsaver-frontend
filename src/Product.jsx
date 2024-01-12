import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Product.css';

function Product() {
    const [products, setProducts] = useState([]);
    const [number, setNumber] = useState(0)
    let { id } = useParams();

    useEffect(() => {
        // Fetch data from API
        fetch('http://localhost:8080/api/products/product-company')
            .then(response => response.json())
            .then(data => {
                // Filter products by productId
                const filteredProducts = data.filter(product => product.productid == id);
                setProducts(filteredProducts);
                setNumber(filteredProducts.length)
                console.log(data);

            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]); 

    return (
        <>
        <div className={number === 1 ? 'wrapper-one' :
                        number === 2 ? 'wrapper-two' : 'wrapper' }>
            {products.map((product, i) => {
                return <Link to={product.link} target="_blank" className={product.price === 0 ? 'product-zero' : 'product'} key={i}>
                            <figure>
                                {<Company companyid={product.companyid}/>}
                                <img className='product-image' src={product.image} alt={product.product_name}></img>
                                <figcaption>{product.product_name}</figcaption>
                                <figcaption className='prod-price'>{product.price === 0 ? "Product Unavailable" : `$${product.price.toFixed(2)}`}</figcaption>
                            </figure>    
                        </Link>
                        })}
                    </div>        
        </>
    ); 
}


function Company( { companyid }) {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/companies')
            .then(response => response.json())
            .then(data => {
                const filteredCompanies = data.filter(company => company.id === companyid);
                setCompanies(filteredCompanies);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [companyid]);

    return (
        <>
            {companies.map((company, i) => (
                <div key={i}>
                    <img src={company.logo} alt={company.name} className={companyid === 3 ? 'sprintfit-logo' : 'logo-other'}/>
                </div>
            ))}
        </>
    );
}


export default Product;
