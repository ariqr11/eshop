import React from 'react';
import Axios from 'axios';
import LandingPage from './Pages/LandingPage';
import RegisPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';
import ProductUserPage from './Pages/ProductUserPage';
import FooterComponent from './Components/Footer';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { API_URL } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/userAction';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DetailPage from './Pages/ProductDetail';
import NotFoundPage from './Pages/NotFoundPage';
import CartPage from './Pages/CartPage';
import TransPage from './Pages/TransactionPage';
import VerificationPage from './Pages/VerificationPage';
// import NavbarComponent from './Components/Navbar';

function App() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role
    }
  })

  const keepLogin = () => {
    let eshopLog = localStorage.getItem('eshopLog');
    if (eshopLog) {
      Axios.get(API_URL + `/auth/keep`, {
        headers: {
          'Authorization': `Bearer ${eshopLog}`
        }
      })
        .then((res) => {
          if (res.data.iduser) {
            localStorage.setItem('eshopLog', res.data.token)
            dispatch(loginAction(res.data));
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/verification/:id' element={<VerificationPage />} />
        {
          role ?
            <>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/transaction' element={<TransPage />} />

            </>
            :
            <>
              <Route path='/register' element={<RegisPage />} />
              <Route path='/login' element={<LoginPage />} />
            </>
        }
        {
          role == "admin" ?
            <Route path='/product/admin' element={<ProductPage />} />
            :
            null
        }
        <Route path='/product' element={<ProductUserPage />} />
        <Route path='/product/Detail' element={<DetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
