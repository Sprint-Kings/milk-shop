import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMilkService from '../../services/MilkService';

import Spinner from '../spinner/Spinner';

const CartProduct = ({id}) => {
    const [product, setProduct] = useState(null);
    
    const {loading, error, getProduct, clearError} = useMilkService();
    
    useEffect(() => {
        updateProduct();  
    }, [])

    
    const updateProduct = () => {
        clearError();
        getProduct(id)
            .then(onProductLoaded);
    }

    const onProductLoaded = (product) => {
        setProduct(product);
    }

    const errorMessage = error ? <h1>Ошибка</h1> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !product) ? <View product={product}/> : null;

    return (
        <Link to={`/product/${id}`} style={{width: '100%', textDecoration: 'none', color: '#3F4FD9'}}>
            {errorMessage}
            {spinner}
            {content}
        </Link>
    )
}

const View = ({product}) => {
    const {name, thumbnail, price} = product;
    
    return (   
        <>
            <div style={{height: '100%', width: '100%', borderColor: '#3F4FD9', borderWidth: '30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <img src={thumbnail} style={{width: '60%', height: '50%', objectFit: 'contain'}} alt={name}></img>
                <div>
                    <p>{name}</p>
                    <h4>{price} &#8381;</h4>
                </div>
            </div>
        </>
    )
}

export default CartProduct;