import styled from 'styled-components';
import logo from '../../img/logo.svg'
import * as styles from '../../styles.js';

const Header = () => {
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
        &:after {
            
        }
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
        <BlueLink to={'/'}><styles.Button>войти</styles.Button></BlueLink>
        <BlueLink to={'/'}><styles.Button>регистрация</styles.Button></BlueLink>
    </Container>
    )
}

export default Header;