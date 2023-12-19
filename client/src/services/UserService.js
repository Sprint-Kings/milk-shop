import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import authHeader from "./AuthHeader";


const useUserService = () => {


const API_URL = "http://localhost:8083/api/";

const {loading, request, error, clearError} = useHttp();

const getUserBoard = async () => {
  const res = await request(`${API_URL}user`, authHeader());
  return res;
}  

const getOrders = async () => {
  const res = await request(`${API_URL}user/orders`, authHeader());
  return res;
}

const getOrder = async (id) => {
  const res = await request(`${API_URL}user/order/${id}`, authHeader());
  return res;
}

const addOrder = async (total) => {
  const res = await request(`${API_URL}user/order/submit`, authHeader(), 'POST', {
    total: total
  });
  return res.message;
};

const deleteOrder = async (orderId, reason) => {
  const res = await request(`${API_URL}user/order/delete`, authHeader(), 'POST', {
    reason: reason,
    orderId: orderId
  });
  return res.message;
};


const getCart = async () => {
  const res = await request(`${API_URL}user/cart`, authHeader());
  return res;
}

const addCart = async (productId, count, price) => {
  const res = await request(`${API_URL}user/cart/submit`, authHeader(), 'POST', {
    productId: productId,
    count: count,
    price: price
  });
  return res.message;
};

const deleteCart = async (productId) => {
  const res = await request(`${API_URL}user/cart/delete`, authHeader(), 'POST', {
    productId: productId
  });
  return res;
};

const refreshToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await request(`${API_URL}auth/refreshtoken`, authHeader(), 'POST', {
    refreshToken: user.refreshToken
  });
  localStorage.setItem("user", JSON.stringify(res));
  return res.data;
};

const getAdminBoard = async () => {
  const res = await request(`${API_URL}admin`, authHeader());
  return res;
}  

const getOrdersAdmin = async () => {
  const res = await request(`${API_URL}admin/orders`, authHeader());
  return res.orders;
}

const updateStatus = async (id, status) => {
  const res = await request(`${API_URL}admin/order/status`, authHeader(), 'POST', {
    id: id,
    status: status
  });
  return res.message;
};

const createProduct = async (id, name, thumbnail, land, date, price, in_stock, typeid) => {
  const res = await request(`${API_URL}admin/product/create`, authHeader(), 'POST', {
    id: id,
    name: name,
    thumbnail: thumbnail,
    land: land,
    date: date,
    price: price,
    in_stock: in_stock,
    typeid: typeid
  });

  return res.message;
};

const deleteProduct = async (id) => {
  const res = await request(`${API_URL}admin/product/delete`, authHeader(), 'POST', {
    id: id,
  });
  return res.message;
};

const getProductsAdmin = async () => {
  const res = await request(`${API_URL}admin/products`, authHeader());
  return res;
}

return {
  loading, request, error,
  clearError, refreshToken,
  getCart, addCart, deleteCart, getUserBoard, getOrders, getOrder, addOrder, deleteOrder,
  getAdminBoard, getOrdersAdmin, updateStatus, createProduct, deleteProduct, getProductsAdmin};
}
export default useUserService;