import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import {MainPage, CatalogPage, ContactsPage, LoginPage, 
  RegistrationPage, ProductPage, CartPage, ProfilePage, OrderPage, AdminPage} from "../pages";

function App() {
  return (
    <Router>
    <div className="app">
        <Header/>
        <main>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/>
                <Route path="/contacts" element={<ContactsPage/>}/>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegistrationPage/>} />
                <Route path="/product/:productId" element={<ProductPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/order/:id" element={<OrderPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="*" element={<h1>404</h1>}/> 
            </Routes>
        </main>
        <Footer/>
    </div>
  </Router>
  );
}

export default App;
