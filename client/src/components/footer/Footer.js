import styled from 'styled-components';
import * as styles from '../../styles.js';

const Footer = () => {
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
        background-color: #3F4FD9;
        `

    return (
    <Container>
        <styles.StyledLink to={'/catalog'}>Каталог</styles.StyledLink>
        <styles.StyledLink to={'/contacts'}>Контакты</styles.StyledLink>
    </Container>
    )
}

export default Footer;