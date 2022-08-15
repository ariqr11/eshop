import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../helper";
import { Text } from "@chakra-ui/react";
import NavbarComponent from "../Components/Navbar";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { loginAction, loginMiddleware } from "../actions/userAction";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [see, newSee] = React.useState(false);

    const handleLogin = async () => {
        try {
            let res = await Axios.post(API_URL + `/auth/login`, {
                email,
                password
            });
            if (res.data.iduser) {
                localStorage.setItem('eshopLog', res.data.token);
                if (res.data.status_id == 1) {
                    navigate('/', { replace: true });
                } else {
                    navigate(`/verification/${res.data.token}`, { replace: true });
                }
                delete res.data.token;
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                });
            }
        } catch (error) {
            console.log(error)
        }
        // await dispatch(loginMiddleware(email, password))
        // let eshopLog = localStorage.getItem('eshopLog');
        // if (!eshopLog || eshopLog == 0) {

        // } else {
        //     if()
        //     navigate('/', { replace: true });
        // }
    }

    const handleSee = () => {
        newSee(true)
    }

    const handleHide = () => {
        newSee(false)
    }

    return (
        <div id='login'>
            <NavbarComponent />
            <div className="container">
                <div id='form-login' className="card bg-white my-5 w-50 p-5 m-auto shadow">
                    <Text fontSize='4xl' className="fw-bold">Sign in for shopping</Text>
                    <div className="d-flex">
                        <h6 className="text-muted">Not have acoount?</h6>
                        <h6 className="text-primary ms-2">Sign up</h6>
                    </div>
                    <div className="mt-5 mb-3">
                        <label className="form-label fw-bold text-muted">Email</label>
                        <input type='email' className='form-control p-3' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Password</label>
                        {see == false
                            ? <div className="input-group border rounded">
                                <input type='password' className='form-control p-3 border-0' onChange={(e) => setPassword(e.target.value)} />
                                <span className="input-group-text bg-transparent border-0" type='button' onClick={handleSee}>
                                    <BsFillEyeFill />
                                </span>
                            </div>
                            :
                            <div className="input-group border rounded">
                                <input type='text' className='form-control p-3 border-0' onChange={(e) => setPassword(e.target.value)} />
                                <span className="input-group-text bg-transparent border-0" type='button' onClick={handleHide}>
                                    <BsFillEyeSlashFill />
                                </span>
                            </div>
                        }
                    </div>
                    <p className="text-muted my-3" style={{ textAlign: 'right' }}>Forgot Password?<span className="ms-2 text-primary">Click Here</span></p>
                    <button type="button" className="btn btn-primary py-3 shadow" onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div >
    )
}

export default LoginPage