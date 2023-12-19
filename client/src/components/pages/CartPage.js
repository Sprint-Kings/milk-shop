import { useState, useEffect } from "react";

import * as styles from '../../styles.js'
import useUserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

import CartProduct from "../cartProduct/CartProduct.js";
import Spinner from '../spinner/Spinner';

const CartPage = () => {
    const [cartList, setCartList] = useState([]);
    const [total, setTotal] = useState(0);
    const [buy, setBuy] = useState(null);
    const [errorSubmit, setErrorSubmit] = useState(null);
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    useEffect(() => {
        updateCart();
    }, [])

    const submit = (id, count, price) => {
        clearError();
        addCart(id, count, price)
            .then(() => updateCart())
    }

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartList.length; i++) {
            sum= sum + (cartList[i].price * cartList[i].count);
        } 
        setTotal(sum);
    }, [cartList])

    const {loading, error, getCart, clearError, refreshToken, deleteCart, addCart, addOrder} = useUserService();

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
          refreshToken().then(
            () => {
                clearError();
              updateCart();
            }
          );
        }
    },[error])

    const updateCart = () => {
        clearError();
        getCart()
            .then(onCartLoaded);
    }
    
    const onCartLoaded = (cart) => {
        setCartList(cart);   
    }

    const removeCartItem = (id) => {
        deleteCart(id).then(
            () => {
            setTotal(0);
            updateCart();
            })
    }

    const submitOrder = () => {
        AuthService.verifyPassword(JSON.parse(localStorage.getItem('login')), password).then(
            () => {
                addOrder(total)
                    .then((message) => {
                    setBuy(<h1>{message}</h1>)
                })
            },
            (error) => {
                setMessage('Неправильный пароль');
            }
        );
        
        
    }

    const cartListItem = cartList.length !== 0 ? cartList.map((item, i) => {
        return (
        <div key={i} style={{height: '30vh', width: '80%', display: 'flex', flexWrap: 'nowrap'}}>
            <CartProduct id={item.product_id}/>
            <div style={{width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
                <div style={{width: '100%',display: 'flex', justifyContent: 'center', height: '20%'}}>
                    <styles.Button style={{marginRight: '5%'}}onClick={item.count === 1 ? null : () => submit(item.product_id, -1, item.price)}>-</styles.Button>
                    <styles.Button onClick={() => submit(item.product_id, 1, item.price)}>+</styles.Button>
                </div>
                <div style={{display: 'flex', height: '80%', width: '100%', justifyContent: 'center'}}>
                    <styles.Button style={{height: '20%', marginTop: '5%', marginRight: '5%'}} onClick={() => removeCartItem(item.product_id)}>Удалить</styles.Button>
                    <h5 style={{color: '#3F4FD9'}}>Количество: {item.count}</h5>
                </div>
            </div>
        </div>)
    }) : <div style={{justifyContent: 'center'}}><h2>Пусто</h2></div>;

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
    const errorMessage = error && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'При создании заказа произошла ошибка'? <h1>Ошибка</h1> : null;
    const spinner = loading ? <div><Spinner/></div> : null;
    const buyMessage = buy ? buy : null;
    const content = !(loading || error || !cartList || buy) ? 
    <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap'}}>
        <div style={{width: '100%'}}>
        <h1 style={{color: '#3F4FD9'}}>Корзина</h1>
        </div>
        {cartListItem}
        <div style={{display: 'flex', justifyContent: 'flex-start', width: '60%', flexDirection: 'column'}}>
            {cartList.length !== 0 ? <h1 style={{color: '#3F4FD9'}}>Итого: {total} &#8381;</h1> : null}
            
            {cartList.length !== 0 ? 
            <>
            <label style={{marginTop: '5%', color: '#3F4FD9'}} htmlFor="password">Пароль:</label>
            <input style={{marginTop: '5%'}} type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
            <styles.Button className='admin-page-button-submit' onClick={() => submitOrder()}>
                Оформить заказ
            </styles.Button></>: null}
            <p>{errorSubmit}</p>
            <p>{message}</p>
        </div>
        
    </div> : null;
    return (
        <div style={{minHeight: '80vh'}}>
            {buyMessage}
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default CartPage;