import {useState, useEffect, useRef} from 'react';
import * as styles from '../../styles.js'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';

import useMilkService from '../../services/MilkService.js';

import CartProduct from '../cartProduct/CartProduct.js';


const CatalogPage = () => {
    const [productList, setProductList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [order, setOrder] = useState('date');

    const {getProducts, getAllTypes} = useMilkService();



    useEffect(() => {
        setProductList([]);
        setTypesList([]);
        onRequest();
    }, [order])


    const onRequest = () => {
        getProducts(order)
            .then(onProductListLoaded)
        getAllTypes()
            .then(onTypesLoaded)
    }

    const onProductListLoaded = (newProductList) => {
        setProductList(productList => [...productList, ...newProductList]);
    }

    const onTypesLoaded = (newTypesList) => {
        setTypesList(typesList => [...typesList, ...newTypesList]);
    }

    function renderItems(arr) {
        
        const items =  arr.map((item, i) => { 
            return (
                <div style={{width: '30%', height: '40vh'}}>
                <CartProduct key={i} id={item.id}/>
                </div>
            )
        });

        return (
            <>
                {items}
            </>
        )
    }
    const StyledP = styled.p`
        color: #3F4FD9;
        text-decoration: none;
        &:after {
            background-color: #3F4FD9;
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
    const renderTypes = (arr) => {
        const items =  arr.map((item, i) => { 
            return (<div style={{width: '50%'}}><StyledP onClick={() => setOrder(item)}>{item}</StyledP></div>)
        });

        return (
            <>
                {items}
            </>
        )
    }

    const types = renderTypes(typesList);
    const items = renderItems(productList);

    return (
        <div style={{}}>
            <h1 style={{color: '#3F4FD9'}}>Каталог</h1>
            <div style ={{display: 'flex', flexWrap: 'nowrap', width: '100%', justifyContent: 'start', alignItems: 'center'}}>
            <h2 style={{color: '#3F4FD9'}}>Сортировать:</h2>
            <styles.Button style={{fontSize: '12pt', height: '70%', marginLeft: '5%', marginRight: '5%', whiteSpace: 'nowrap'}} onClick={() => {setOrder('price'); }}>По цене</styles.Button>
            <styles.Button style={{fontSize: '12pt', height: '70%', marginRight: '5%', whiteSpace: 'nowrap'}} onClick={() => {setOrder("date");}}>По году производства</styles.Button>
            <styles.Button style={{fontSize: '12pt', height: '70%', marginRight: '5%', whiteSpace: 'nowrap'}} onClick={() => {setOrder("name");}}>По наименованию</styles.Button>
            <Popup trigger=
                {<styles.Button style={{fontSize: '12pt', height: '70%', marginRight: '5%', whiteSpace: 'nowrap'}}>По категории</styles.Button>}
                position="right center">
                {types}
            </Popup>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '95%', margin: '5%', flexWrap: 'wrap'}}>
                {productList.length > 0 ? items : <h2 style={{color: '#3F4FD9'}}>В данной категории товаров нет</h2>}
            </div>
        </div>
    )
}

export default CatalogPage;