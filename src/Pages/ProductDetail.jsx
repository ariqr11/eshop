import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarComponent from '../Components/NavbarBlack';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Skeleton, Divider } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateCartAction } from '../actions/userAction';


const DetailPage = () => {
    const [user, setUser] = React.useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state, search } = useLocation()
    const [count, setCount] = React.useState(1)

    const getDetail = () => {
        Axios.get(API_URL + `/product${search}`)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getData = () => {
        Axios.get(API_URL + '/users')
            .then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const getUser = () => {
        let idUser = localStorage.getItem('eshopLog');
        console.log(idUser)
        if (idUser) {
            Axios.get(API_URL + `/users?id=${idUser}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        console.log(res.data[0])
                        setUser(res.data[0])
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleBuy = () => {
        let idUser = localStorage.getItem('eshopLog');
        let index = user.cart.findIndex((val) => val.item == state.name)
        if (index == -1) {
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: [...user.cart, {
                    item: state.name,
                    images: state.images,
                    brand: state.brand,
                    qty: count,
                    price: state.price
                }]
            }
            ).then((res) => {
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            user.cart[index].qty = user.cart[index].qty + count
            console.log(user.cart)
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: [...user.cart]
            }
            ).then((res) => {
            }).catch((err) => {
                console.log(err)
            })
        }
    }


    React.useEffect(() => {
        getDetail();
        getUser();
        getData();
    }, [])

    return (<div id='product-detail'>
        <NavbarComponent />
        <div id="bg-product">
        </div>
        <div className='container'>
            <div className='col-12 container'>
                <span className='fs-1 fw-bold'>Product Detail</span>
                <br />
                <span className='lead text-muted fs-6'>Choose product and <span className='text-primary fw-bold'>transact more easily</span></span>
            </div>
        </div>
        <div className='container'>
            <div className='row'>
                <div className='d-flex row'>
                    <div className='col-md-6 col-12 p-3'>
                        <img src={state.images} className='img-fluid bg-white shadow border mx-3' alt="" width={1000} height={1000}></img>
                    </div>
                    <div className='col-md-6 col-12 p-3' style={{ fontFamily: 'monospace' }}>
                        <span className='fs-1 fw-bold'>{state.name} || <span className='text-danger'>Rp. {state.price.toLocaleString('id')}</span></span>
                        <Skeleton startColor='pink.500' endColor='orange.500' height='20px' width={130} />
                        <br />
                        <span className='card text-dark fs-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: 203 }}>About Product</span>
                        <Divider className='mt-2 mb-4' style={{ width: 203 }} />
                        <span className='fs-3 mt-5'><span className='text-primary'>Deskripsi Produk</span> : {state.description}</span>
                        <br />
                        <span className='fs-3'><span className='text-primary'>Brand</span> : {state.brand}</span>
                        <br />
                        <span className='fs-3'><span className='text-primary'>Category</span> : {state.category}</span>
                        <br />
                        <div className='card w-75 mt-3 p-3 text-center align-items-center' style={{ backgroundColor: '#B0C4DE' }}>
                            <span className='fs-3'>Stok tersisa {state.stock} buah</span>
                            <div className='d-flex mt-3 p-4 justify-content-between'>
                                <button className='btn border' onClick={count > 1 ? () => setCount(count - 1) : null} >-</button>
                                <span className='mx-3 text-center fs-3'>{count}</span>
                                <button className='btn border' onClick={count < state.stock ? () => setCount(count + 1) : null} >+</button>
                            </div>
                            <span className='fs-3 text-primary'>Subtotal : Rp. {(state.price * count).toLocaleString('id')}</span>
                            <button className='btn btn-light py-2 text-muted mt-3 w-100 shadow border' onClick={() => navigate('/cart')}>
                                <div className='d-flex justify-content-center align-items-center' onClick={handleBuy}>
                                    <AiOutlineShoppingCart size={36} className="me-2" /> <span> Add to Cart</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
    )
}



export default DetailPage