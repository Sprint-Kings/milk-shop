import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
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



export const Input = styled.input`
        margin-top: 2%;
        outline:none;
        height: 2vmax;
        width: 100%;
        border: none;
        border-bottom: 1px;
        border-bottom-style: solid;
        border-color: #8d8d8d;
        font-size: calc((100vw - 1rem)/70);
        font: weight 100px;
        font-family: 'Scada';
        transition: all .2s ease-in-out; 
        
        &:focus {
            border-color: #000000;  
        }
    `

export const InputInvalid = styled.input`
        margin-top: 2%;
        outline:none;
        height: 2vmax;
        width: 100%;
        border: none;
        border-bottom: 1px;
        border-bottom-style: solid;
        font-size: calc( (100vw - 1rem)/70);
        font: weight 100px;
        font-family: 'Scada';
        transition: all .2s linear; 
        border-color: #dc3545;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(.375em + .1875rem) center;
        background-size: calc(.75em + .375rem) calc(.75em + .375rem);
        &:focus {
            border-color: #dc3545;
            
        }
    `



