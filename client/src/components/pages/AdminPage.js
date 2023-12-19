import { useEffect, useState } from "react";
import useUserService from '../../services/UserService';
import { useFormik } from "formik";
import * as Yup from 'yup';

import Spinner from '../spinner/Spinner';

const AdminPage = () => {
  const [contentType, setContentType] = useState('orders')
  const {loading, error, clearError, refreshToken, getOrdersAdmin, updateStatus, getProductsAdmin, createProduct, deleteProduct} = useUserService();

  const renderContent = () => {
      if (contentType === 'orders') {
        const content = <ViewOrders loading={loading} getOrdersAdmin={getOrdersAdmin} clearError={clearError} updateStatus={updateStatus} refreshToken={refreshToken} error={error}/>
        return content
      }
      if (contentType === 'products') {
        const content = <ViewProducts loading={loading} getProductsAdmin={getProductsAdmin} clearError={clearError} createProduct={createProduct} refreshToken={refreshToken} error={error} deleteProduct={deleteProduct}/>
        return content
      }
  }

  const content = renderContent();
  return (
    <div>
      <button onClick={() => setContentType('orders')}>Заказы</button>
      <button onClick={() => setContentType('products')}>Товары</button>
      {content}
    </div>
  );
};

const ViewOrders = ({loading, getOrdersAdmin, clearError, updateStatus, error, refreshToken}) => {
  const [orders, setOrders] = useState([]);
  const [errorSubmit, setErrorSubmit] = useState();

  useEffect(() => {
    updateOrders();
  }, [])
  
  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .required("Введите номер заказа"),
    status: Yup.string()
      .required('Введите статус заказа'),
  });

  const formik = useFormik({
    initialValues: {
    id: "",
    status: ""
  }, validationSchema,
  onSubmit: (data, helpers) => {
      updateStatus(data.id, data.status).then(
          () => {  
              updateOrders();
          }
          
      );
      if (!error) {
        helpers.resetForm({
          data,
      });
      }
  }});
  
  useEffect(() => {
    if (error === 'Unauthorized! Access Token was expired!' || error === 'Failed to fetch' || error === 'Require Admin Role!') {
      refreshToken().then(
        () => {
          updateOrders()
        }
      );
    } 
    else {
      setErrorSubmit(error)
    }
    
    
  },[error])

  const updateOrders= () => {
    clearError();
    getOrdersAdmin()
        .then(onOrdersLoaded);
  }

  const onOrdersLoaded = (orders) => {
      setOrders(orders);
  }

  const removeOrder = (id) => {
    updateStatus(id, 2).then(
      () => {
      updateOrders();
      })
    }

  

  const ordersList = orders.length !== 0 ? 
    orders.map(order => {
      return <tr>
              <td style={{borderLeft: 0}}>{order.id}</td>
              <td>{order.fio}</td>
              <td>{order.date}</td>
              <td>{order.count_array.length}</td>
              <td>{order.statusid}</td>
              <td style={{borderRight: 0}}>
                <p className="admin-page-button" style={{textAlign: 'center'}} onClick={() => removeOrder(order.id)}>
                  Удалить
                </p>
              </td>
            </tr>
  }): () => updateOrders();

 const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
  const errorMessage = error && !errorSubmit && error !== 'Refresh token was expired. Please make a new signin request' ? <h1>Ошибка</h1> : null;
  const spinner = loading ? <div className="login-page-container"><Spinner/></div>: null;
  const content = !(loading || (error && (errorSubmit === 'Refresh token was expired. Please make a new signin request' || errorSubmit === null))) ? 
  <div className="admin-page-container">
            <h1>Список заказов</h1>
            <form onSubmit={formik.handleSubmit} style={{width: '80%'}}>
            <table className="admin-page-table">
              <tr>
                <td style={{borderLeft: 0, fontWeight: 600}}><p>номер</p></td>
                <td style={{fontWeight: 600}}>фио</td>
                <td style={{fontWeight: 600}}>дата</td>
                <td style={{fontWeight: 600}}>количество товаров</td>
                <td style={{fontWeight: 600}}>статус</td>
                <td> </td>
              </tr>
              {ordersList}
              <tr>
                <td style={{borderLeft: 0}}>
                  <input
                    placeholder="номер"
                    type="text"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.id && formik.touched.id
                    ? <p className="admin-page-invalid-message">{formik.errors.id}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="статус"
                    type="text"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.status && formik.touched.status
                    ? <p className="admin-page-invalid-message">{formik.errors.status}</p>
                  : null}
                </td>
              </tr>
            </table>
            <button className='admin-page-button-submit' type="submit">
              Добавить
            </button>
            <p className='admin-page-invalid-message'>{errorSubmit}</p>
          </form>
      </div> : null;
  return (
    <>
      {errorMessage}
      {unauthorized}
      {spinner}
      {content}
    </>
  );
}

const ViewProducts = ({loading, getProductsAdmin, clearError, createProduct, error, refreshToken, deleteProduct}) => {
  const [products, setProducts] = useState([]);
  const [errorSubmit, setErrorSubmit] = useState();
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    updateProducts();
  }, [])
  
  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .required("Введите id"),
    name: Yup.string()
      .required("Введите название товара"),
    thumbnail: Yup.string()
      .required('Введите ссылку на картинку'),
    land: Yup.string()
      .required('Введите страну изготовителя'),
    date: Yup.string()
      .required('Введите дату изготовления'),
    price: Yup.string()
      .required('Введите цену'),
    typeid: Yup.string()
      .required('Введите категорию товара'),
  });

  const formik = useFormik({
    initialValues: {
    id: "",
    name: "",
    thumbnail: "",
    land: "",
    date: "",
    price: "",
    typeid: ""
  }, validationSchema,
  onSubmit: (data, helpers) => {
      createProduct(data.id, data.name, data.thumbnail, data.land, data.date, data.price, checkbox, data.typeid, ).then(
          () => {  
              updateProducts();
          }
          
      );
      if (!error) {
        helpers.resetForm({
          data,
      });
      }
  }});
  
  useEffect(() => {
    if (error === 'Unauthorized! Access Token was expired!' || error === 'Failed to fetch' || error === 'Require Admin Role!') {
      refreshToken().then(
        () => {
          updateProducts()
        }
      );
    } 
    else {
      setErrorSubmit(error)
    }
    
    
  },[error])

  const updateProducts= () => {
    clearError();
    getProductsAdmin()
        .then(onProductsLoaded);
  }

  const onProductsLoaded = (products) => {
    console.log(products)
      setProducts(products);
  }

  const removeProduct = (id) => {
    deleteProduct(id).then(
      () => {
      updateProducts();
      })
    }

  

  const productsList = products.length !== 0 ? 
    products.products.map(product => {
      return <tr>
              <td style={{borderLeft: 0}}>{product.product_id}</td>
              <td>{product.name}</td>
              <td>{product.thumbnail}</td>
              <td>{product.land}</td>
              <td>{product.date}</td>
              <td>{product.price}</td>
              <td>{product.in_stock ? <p>Да</p> : <p>Нет</p>}</td>
              <td>{product.typeId}</td>
              <td style={{borderRight: 0}}>
                <p className="admin-page-button" style={{textAlign: 'center'}} onClick={() => removeProduct(product.product_id)}>
                  Удалить
                </p>
              </td>
            </tr>
  }): () => updateProducts();

 const unauthorized = error === 'Refresh token was expired. Please make a new signin request' ? <h1>Вы не авторизованы</h1> : null;
  const errorMessage = error && !errorSubmit && error !== 'Refresh token was expired. Please make a new signin request' ? <h1>Ошибка</h1> : null;
  const spinner = loading ? <div className="login-page-container"><Spinner/></div>: null;
  const content = !(loading || (error && (errorSubmit === 'Refresh token was expired. Please make a new signin request' || errorSubmit === null))) ? 
  <div style={{width: '100%'}}>
            <h1>Список товаров</h1>
            <form onSubmit={formik.handleSubmit} style={{width: '80%'}}>
            <table className="admin-page-table">
              <tr>
                <td style={{borderLeft: 0, fontWeight: 600}}><p>id</p></td>
                <td style={{fontWeight: 600}}>название</td>
                <td style={{fontWeight: 600}}>фото</td>
                <td style={{fontWeight: 600}}>страна</td>
                <td style={{fontWeight: 600}}>Дата изготовления</td>
                <td style={{fontWeight: 600}}>цена</td>
                <td style={{fontWeight: 600}}>в наличии</td>
                <td style={{fontWeight: 600}}>категория</td>
                <td> </td>
              </tr>
              {productsList}
              <tr>
              <td style={{borderLeft: 0}}>
                  <input
                    placeholder="id"
                    type="text"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.id && formik.touched.id
                    ? <p className="admin-page-invalid-message">{formik.errors.id}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="название"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && formik.touched.name
                    ? <p className="admin-page-invalid-message">{formik.errors.name}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="фото"
                    type="text"
                    name="thumbnail"
                    value={formik.values.thumbnail}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.thumbnail && formik.touched.thumbnail
                    ? <p className="admin-page-invalid-message">{formik.errors.thumbnail}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="страна"
                    type="text"
                    name="land"
                    value={formik.values.land}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.land && formik.touched.land
                    ? <p className="admin-page-invalid-message">{formik.errors.land}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="дата изготовления"
                    type="text"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.date && formik.touched.date
                    ? <p className="admin-page-invalid-message">{formik.errors.date}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="цена"
                    type="text"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.price && formik.touched.price
                    ? <p className="admin-page-invalid-message">{formik.errors.price}</p>
                  : null}
                </td>
                <td>
                  <input
                    placeholder="в наличии"
                    type="checkbox"
                    name="checkbox"
                    onClick={() => setCheckbox(checkbox => !checkbox)}
                  />
                </td>
                <td>
                  <input
                    placeholder="категория"
                    type="text"
                    name="typeid"
                    value={formik.values.typeid}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.typeid && formik.touched.typeid
                    ? <p className="admin-page-invalid-message">{formik.errors.typeid}</p>
                  : null}
                </td>
              </tr>
            </table>
            <button className='admin-page-button-submit' type="submit">
              Добавить
            </button>
            <p className='admin-page-invalid-message'>{errorSubmit}</p>
          </form>
      </div> : null;
  return (
    <>
      {errorMessage}
      {unauthorized}
      {spinner}
      {content}
    </>
  );
}
export default AdminPage;