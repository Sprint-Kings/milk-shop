import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
        display: inline-block;
        color: white;
        text-decoration: none;
        &:after {
            background-color: white;
            display: block;
            content: "";
            height: 2px;
            width: 0%;
            -webkit-transition: width .2s ease-in-out;
            -moz--transition: width .2s ease-in-out;
            transition: width .2s ease-in-out;
        }
        &:hover:after {
            width: 100%;
        }
    `

export const Button = styled.button`
        display: inline-block;
        color: #3F4FD9;
        text-decoration: none;
        font-size: inherit;
        border-color: #3F4FD9;
        border-radius: 1rem;
        border-width: 0.2rem;
        padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    `
