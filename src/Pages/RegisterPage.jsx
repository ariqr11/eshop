import React, { useState } from 'react';
import img1 from './undraw_Personal_documents_re_vcf2.png'
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs"
import Axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { API_URL } from '../helper';
import { useToast } from '@chakra-ui/react'
import NavbarComponent from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const RegisPage = (props) => {
    const navigate = useNavigate();
    const [see, newSee] = React.useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const toast = useToast();

    const handleInput = (element) => {
        element.preventDefault();
        const inputName = element.target.getAttribute('name');
        const inputValue = element.target.value;
        console.log(element.target.value)

        const inputNewUser = { ...newUser };
        inputNewUser[inputName] = inputValue;

        setNewUser(inputNewUser);
    }


    const handleSubmit = () => {
        Axios.post(API_URL + '/auth/regis', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        }).then((response) => {
            if (response.data.success) {
                toast({
                    title: "Account Created",
                    description: `Welcome to E-Shop`,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSee = () => {
        newSee(true)
    }

    const handleHide = () => {
        newSee(false)
    }

    return <div id="regis" >
        <NavbarComponent />
        <div className='container form-control py-0 my-0 bg-white'>
            <div className='row shadow rounded'>
                <div className='col-8 d-none d-md-block '>
                    <h2 className='text-primary p-3 fs-2'>E-SHOP</h2>
                    <h3 className='lead ms-1 text-muted p-2'>A central hub where teams can work, plan, and achieve amazing things together</h3>
                    <img src={img1} className='w-100 bg-transparent' alt=""></img>
                </div>
                <div className='card col-md-4 bg-light col-12 '>
                    <br />
                    <span className='ms-auto fs-6'>English(USA)</span>
                    <h6 className=' muted-color text-sm mt-5'>START FOR FREE</h6>
                    <h1 className='fw-bold text-xl fs-2 mt-2'>Sign up to E-SHOP</h1>
                    <div className='d-flex fs-6 lead text-muted mt-2'>
                        <h6>Already a member ? </h6>
                        <h6 className='fw-bold text-primary ms-2'> Sign in</h6>
                    </div>
                    <br />
                    <div>
                        <div>
                            <label className='form-label text-muted'>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder='example01'
                                className='w-100 form-control'
                                onChange={handleInput}>
                            </input>
                        </div>
                        <br />
                        <div>
                            <label className='form-label text-muted'>E-Mail</label>
                            <input
                                type="text"
                                name="email"
                                placeholder='name@example.com'
                                className='w-100 form-control '
                                onChange={handleInput}>
                            </input>
                        </div>
                        <br />
                        <div>
                            <label className='form-label text-muted'>Password</label>
                        </div>
                        {see ?
                            <div className='input-group border rounded'>
                                <input
                                    type="text"
                                    name="password"
                                    placeholder='6+ character'
                                    className='form-control border-0'
                                    onChange={handleInput}>
                                </input>
                                <span className='input-group-text bg-white border-0' type='button' onClick={handleHide}><BsFillEyeSlashFill size={20} /></span>
                            </div> :
                            <div className='input-group border rounded'>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='6+ character'
                                    className='form-control border-0'
                                    onChange={handleInput}>
                                </input>
                                <span className='input-group-text bg-white border-0' type='button' onClick={handleSee}><BsFillEyeFill size={20} /></span>
                            </div>
                        }
                        <div>
                            <br />
                            <br />
                            <button type='button' className='btn btn-success btn-lg w-100 border-0 ' onClick={() => {
                                navigate('/login');
                                handleSubmit()
                            }}>Create an Account</button>
                            <div className='text-center text-muted my-3'>
                                <span>or</span>
                            </div>
                            <button onClick={() => window.open(`${API_URL}/auth/google`, '_blank').focus()} className='btn btn-light py-2 text-muted mb-5 w-100 shadow border'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <FcGoogle size={36} className="me-2" /> <span> Sign up with Google</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    </div>
}

export default RegisPage;