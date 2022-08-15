import React from "react";
import Axios from "axios";
import { API_URL } from "../helper";
import NavbarComponent from '../Components/NavbarBlack';
import { GoUnverified } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerificationPage = (params) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(window.location)

    const handleVerif = async () => {
        try {
            let token = window.location.href.split('verification/')[1]
            console.log(token)
            let res = await Axios.get(API_URL + `/auth/verif`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            if (res.data.iduser) {
                localStorage.setItem('eshopLog', res.data.token);
                delete res.data.token;
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log(error)
        }
    }


    return <div>
        <NavbarComponent />
        <div className='container w-100 bg-white' style={{ marginTop: 100 }}>
            <GoUnverified size={200} className="m-auto" />
            <p className="text-muted text-center">After Register, you can access all feature with verified account</p>
            <br />
            <button type="button" className="btn btn-outline-warning w-25 position-relative" style={{ marginLeft: 500 }} onClick={() => handleVerif()} >Verified Your Account</button>
        </div>
    </div>
}

export default VerificationPage