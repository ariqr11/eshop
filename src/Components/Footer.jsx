import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

const FooterComponent = () => {

    const navigate = useNavigate();

    return <div className="p-5 shadow" style={{ marginTop: "450px" }}>
        <div className='container d-none d-md-flex flex-wrap justify-content-between'>
            <span className='navbar-brand btn' onClick={() => navigate('/')}>
                <span className='fw-bold text-primary '>E-SHOP</span>
                <span className='ms-1'>| Furniture</span>
            </span>
            <ul className="d-none d-md-block btn" style={{ listStyleType: "none", textAlign: 'left' }} >
                <li onClick={() => navigate('/product')}><b>Products</b></li>
                <li>Livingroom</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
            </ul>
            <ul className="d-none d-md-block" style={{ listStyleType: "none" }} >
                <li><b>Company</b></li>
                <li>About us</li>
                <li>Career</li>
            </ul>
            <div className="d-none d-md-block">
                <b className='ms-1'>Follow us</b>
                <div className='d-flex'>
                    <AiFillFacebook className="text-primary" size={42} />
                    <AiFillInstagram className="text-primary" size={42} />
                    <AiFillTwitterCircle className="text-primary" size={42} />
                </div>
            </div>
        </div>
        <div className='d-block d-md-none text-center'>
            <span className='navbar-brand btn' onClick={() => navigate('/')}>
                <span className='fw-bold text-primary '>
                    E-SHOP
                </span>
                <span className='ms-1'>
                    | Furniture
                </span>
            </span>
        </div>
        <div className='text-muted text-center mt-3'>© 2022 ESHOP Engineer. All rights reserved.</div>
    </div>
}

export default FooterComponent;