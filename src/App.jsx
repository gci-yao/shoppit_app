// installer l'extension : "es7"
// rafce pour lancer
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage'
import MainLayout from './layout/MainLayout'
import NotFoundPage from './components/ui/NotFoundPage';
import ProductPage from './components/product/ProductPage';
import CartPage from './components/cart/CartPage'
import api from './api';
import CheckoutPage from './components/checkout/CheckoutPage';
import LoginPage from './components/user/LoginPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UserProfilePage from './components/user/UserProfilePage';
import PaymentStatusPage from './components/payment/PaymentStatusPage';
import RegisterPage from './components/user/RegisterPage';
import EditProfilePage from './components/user/EditProfilePage';



const App = () => {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res =>{
        console.log(res.data)
        setNumberCartItems(res.data.num_of_items)
      })
      .catch(err=>{
        console.log(err.messsage)
      })
      
    }
    },[])



  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout numCartItems={numCartItems}/>}>
      <Route index element={<HomePage />} />
      <Route path="/products/:slug" element={<ProductPage  setNumCartItems={setNumberCartItems} />} />
      <Route path="cart" element={<CartPage  setNumCartItems={setNumberCartItems}/>} />
      <Route path="checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="profile" element={<UserProfilePage />} />
      <Route path="*" element={<NotFoundPage  />} />
      <Route path="/edit-profile" element={<EditProfilePage  />} />
      <Route path="payment-status" element={<PaymentStatusPage setNumberCartItems={setNumberCartItems} />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App