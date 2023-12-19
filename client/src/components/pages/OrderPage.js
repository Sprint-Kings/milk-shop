import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import * as styles from '../../styles.js'
import useUserService from '../../services/UserService';

import CartProduct from "../cartProduct/CartProduct";
import Spinner from '../spinner/Spinner';

const OrderPage = () => {
    const {id} = useParams();
    const [buy, setBuy] = useState(null);
    const [order, setOrder] = useState(null);
    const [reason, setReason] = useState('')
    const [form, setForm] = useState(false)
    const {loading, error, clearError, refreshToken, deleteOrder, getOrder} = useUserService();

    useEffect(() => {
        updateOrder();
    }, [])

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
          refreshToken().then(
            () => {
                clearError();
                updateOrder();
            }
          )
        }
    },[error])

    const updateOrder = () => {
        clearError();
        getOrder(id)
            .then(onOrderLoaded);
    }
    
    const onOrderLoaded = (order) => {
        setOrder(order);   
    }

    const removeOrder = () => {
        clearError();
        deleteOrder(id, reason)
        .then((message) => {
            clearError();
            setBuy(message)
        })
    }

    const orderListItem = order ? order.product_array.map((item, i) => {
        return (
        <div style={{width: '80%', display: 'flex', height: '30vh'}}>
            <CartProduct id={item}/>
        </div>)
    }) : <div style={{justifyContent: 'center'}}><h2>Пусто</h2></div>;

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
    const errorMessage = error && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'При отмене заказа произошла ошибка' ? <h1>Ошибка</h1> : null;
    const spinner = loading ? <div className="login-page-container"><Spinner/></div> : null;
    const buyMessage = buy ? <h1>{buy}</h1> : null;
    const content = !(loading || error || buy || !order) ? 
    <div style={{width: '100%', color: '#3F4FD9', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
        <div style={{width: '100%'}}><h1>Заказ №{id}</h1></div>
        {orderListItem}
        <div style={{marginBottom: '5%', display: 'flex', justifyContent: 'center', width: '60%', flexDirection: 'column'}}>
            <h1>Итого: {order.total} &#8381;</h1>
            <h3>Дата создания: {order.date}</h3>
            <h3>Статус заказа: {order.statusid}</h3>
            {order.statusid === 'Новый' ? <styles.Button onClick={() => setForm(true)}>
                Отменить заказ
            </styles.Button> : null}
            {form ? <label style={{marginTop: '5%', color: '#3F4FD9'}} htmlFor="text">Напишите причину:</label> : null}
            {form ? <input style={{marginTop: '5%'}}type="text" name="reason" onChange={(e) => setReason(e.target.value)}>
            </input> : null}
            {form ? <styles.Button style={{marginTop: '5%'}} onClick={() => removeOrder()}>
                Подтвердить
            </styles.Button> : null}
        </div>
        
    </div> : null;
    return (
        <div>
            {buyMessage}
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default OrderPage;