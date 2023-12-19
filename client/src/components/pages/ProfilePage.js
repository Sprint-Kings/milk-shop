import { useEffect, useState } from "react";
import useUserService from '../../services/UserService';
import { Link } from "react-router-dom";

import Spinner from '../spinner/Spinner';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    updateProfile();
    updateOrders();
  }, [])
  
  const {loading, error, getUserBoard, clearError, refreshToken, getOrders} = useUserService();

  useEffect(() => {
    if (error === 'Unauthorized! Access Token was expired!') {
        clearError();
      refreshToken().then(
        () => {
            clearError();
          updateProfile();
        }
      );
    }
  },[error])

  const updateProfile = () => {
    clearError();
    getUserBoard()
        .then(onProfileLoaded);
  }

  const onProfileLoaded = (profile) => {
      setCurrentUser(profile);
      
  }

  const updateOrders = () => {
    clearError();
    getOrders()
        .then(onOrdersLoaded);
  }

  const onOrdersLoaded = (orders) => {
      setOrders(orders); 
  }
  
  const ordersList = orders.length !== 0 ? 
    orders.map((order, i) => {
      return <tr>
              <td><Link to={`/order/${order.id}`} style={{ textAlign: 'center', textDecoration: 'none', color: '#3F4FD9'}}><p>{order.id}</p></Link></td>
              <td><Link to={`/order/${order.id}`} style={{ textAlign: 'center', textDecoration: 'none', color: '#3F4FD9'}}><p>{order.date.substr(0,10)}</p></Link></td>
              <td><Link to={`/order/${order.id}`} style={{ textAlign: 'center', textDecoration: 'none', color: '#3F4FD9'}}><p>{order.count_array.length}</p></Link></td>
              <td><Link to={`/order/${order.id}`} style={{ textAlign: 'center', textDecoration: 'none', color: '#3F4FD9'}}><p>{order.total} &#8381;</p></Link></td>
              <td><Link to={`/order/${order.id}`} style={{ textAlign: 'center', textDecoration: 'none', color: '#3F4FD9'}}><p>{order.statusid}</p></Link></td>
            
            </tr>
  }): <tr><td colSpan='4' style={{padding: '5%'}}>У вас пока нет заказов</td></tr>;

  const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
  const errorMessage = error && error !== 'Refresh token was expired. Please make a new signin request'? <h1>Ошибка</h1> : null;
  const spinner = loading ? <div className="login-page-container"><Spinner/></div> : null;
  const content = !(loading || error || !currentUser) ? 
  <div style={{color: '#3F4FD9'}}>
          <div style={{marginLeft: '5%'}}>
              <h1>Мой аккаунт</h1>
              <h2>Имя: {currentUser.firstname}</h2>
              <h2>Фамилия: {currentUser.surname}</h2>
              <h2>Отчество: {currentUser.patronymic}</h2>
              <h2>Логин: {currentUser.login}</h2>
              <h2>Почта: {currentUser.email}</h2>
          </div>
          <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap'}}>
            <h1>Мои заказы</h1>
            <table className="profile-page-table" style={{width: '90%', marginBottom: '5%'}}>
              <td style={{textAlign: 'center', fontWeight: 600}}><p>Номер заказа</p></td>
              <td style={{textAlign: 'center', fontWeight: 600}}><p>Дата создания</p></td>
              <td style={{textAlign: 'center', fontWeight: 600}}><p>Количество товаров</p></td>
              <td style={{textAlign: 'center', fontWeight: 600}}><p>Сумма</p></td>
              <td style={{textAlign: 'center', fontWeight: 600}}><p>Статус заказа</p></td>
              {ordersList}
            </table>
          </div>
      </div> : null;
  return (
    <div>
      {unauthorized}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default ProfilePage;