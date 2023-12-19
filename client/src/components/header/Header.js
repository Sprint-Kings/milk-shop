import styled from 'styled-components';
import logo from '../../img/logo.svg'
import * as styles from '../../styles.js';

import { useState, useEffect } from 'react';

import AuthService from "../../services/AuthService";
import EventBus from "../../services/EventBus";

const Header = () => {
    const [style, setStyle] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
          setCurrentUser(user);
          const roles = localStorage.getItem("roles")
          setShowAdminBoard(roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
          });
      
          return () => {
            EventBus.remove("logout");
          };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowAdminBoard(false);
        setCurrentUser(false);
    };

    const Container = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-family: 'Scada', sans-serif;
        z-index: 2;
        -webkit-box-shadow: -4px 10px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: -4px 10px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: -4px 10px 8px 0px rgba(34, 60, 80, 0.2);
        height: 10vh;
        `
    
    const BlueLink = styled(styles.StyledLink)`
        color: #3F4FD9;
    `
    return (
    <Container>
        <BlueLink to={'/catalog'}>Каталог</BlueLink>
        <BlueLink to={'/contacts'}>Контакты</BlueLink>
        <BlueLink to={'/'} style={{height: 'inherit'}}>
            <div style={{display: 'flex', flexDirection: 'column', height: 'inherit'}}>
                <img src={logo} alt='logo' style={{height: '70%'}}></img>
                Альпийская буренка
            </div>
        </BlueLink>
        {currentUser !== false ? (
                        <>
                            {showAdminBoard ? 
                            <BlueLink to={'/admin'} style={{ textDecoration: 'none'}} className='container-icon-image' onClick={() => setStyle(style => style ? !style : style)}>  
                                <styles.Button>Админ</styles.Button>
                            </BlueLink> : null}
                            <BlueLink to={'/cart'} className='container-icon-image' onClick={() => setStyle(style => style ? !style : style)}>  
                                    <styles.Button>Корзина</styles.Button>
                            </BlueLink>
                            <BlueLink to={'/profile'} className='container-icon-image' onClick={() => setStyle(style => style ? !style : style)}>
                                <styles.Button>{currentUser}</styles.Button>
                            </BlueLink>
                            <BlueLink to={'/'} onClick={() => {logOut(); setStyle(style => style ? !style : style)}} className='container-icon-image'>
                                <styles.Button>Выход</styles.Button>
                            </BlueLink> 
                        </>) : (
                        <>
                            <BlueLink to={'/login'} className='container-icon-image' onClick={() => setStyle(style => style ? !style : style)}>
                                <styles.Button>Вход</styles.Button>
                            </BlueLink>
                            <BlueLink to={'/register'} className='container-icon-image' onClick={() => setStyle(style => style ? !style : style)}>
                                <styles.Button>Регистрация</styles.Button>
                            </BlueLink> 
                        </>
                    )}
    </Container>
    )
}

export default Header;