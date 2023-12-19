import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as styles from '../../styles.js';

import Spinner from '../spinner/Spinner';

import useMilkService from '../../services/MilkService';
import useUserService from '../../services/UserService';

const ProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState(null);

    const {loading, getProduct, clearError} = useMilkService();
    const {addCart, error, refreshToken} = useUserService();

    
    useEffect(() => {
        updateProduct()
        
    }, [productId])
    
    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
          refreshToken().then(
            () => {
                clearError();
              submit();
            }
          );
        }
        if (error === 'No token provided!') {
            updateProduct();
        }
      },[error])
    
    const submit = () => {
        clearError();
        addCart(product.id, 1, product.price)
            .then((message) => setMessage(message))
    }

    const updateProduct = () => {
        clearError();
        getProduct(productId)
            .then(onProductLoaded)
        
    }

    const onProductLoaded = (product) => {
        setProduct(product);
    }

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!'? <h1>Ошибка</h1> : null;
    const spinner = loading ? <div><Spinner/></div> : null;
    const content = !(loading || !product || product.in_stock === false) ? <View product={product} submit={submit} message={message}/> : <h1>Товара нет в наличии</h1>;

    return (
        <div style={{height: '80vh', width: '100%', display: 'flex', flexWrap: 'nowrap'}}>
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({product, submit, message}) => {
    const {name, thumbnail, price, land, type, date} = product;
    return (
        <>
            <div style={{height: '70%', width: '50%', margin: '5%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                <img src={thumbnail} alt={name} style={{width: '80%', height: '80%', objectFit: 'contain'}}></img>
                <styles.Button onClick={() => submit()}>В корзину</styles.Button>
                {message}
            </div>
            <div style={{width: '50%', margin: '5%'}}>
                <h2 style={{color: '#3F4FD9'}}>{name}</h2>
                <h3 style={{color: '#3F4FD9'}}>{price}</h3>
                <h3 style={{color: '#3F4FD9'}}>Страна: {land}</h3>
                <h3 style={{color: '#3F4FD9'}}>Дата изготовления: {date.substr(0, 10)}</h3>
                <h3 style={{color: '#3F4FD9'}}>Категория: {type}</h3>
            </div>
            
        </>
    )
}

export default ProductPage;