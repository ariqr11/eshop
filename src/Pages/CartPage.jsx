import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Divider
} from '@chakra-ui/react'
import {
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import NavbarComponent from '../Components/NavbarBlack';


const CartPage = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = React.useState(false);
    const [data, setData] = React.useState([])
    const [user, setUser] = React.useState([])


    const getUser = () => {
        let idUser = localStorage.getItem('eshopLog');
        if (idUser) {
            Axios.get(API_URL + `/users?id=${idUser}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setUser(res.data[0].cart)
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    const getData = () => {
        Axios.get(API_URL + '/products')
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const [selectedShipping, setSelectedShipping] = React.useState(null);
    const [deliv, setDeliv] = React.useState(0)
    const [shipping, setShipping] = React.useState([
        {
            id: 1,
            type: 'Reguler',
            pay: 0.05
        },
        {
            id: 2,
            type: 'Next Day',
            pay: 0.075
        },
        {
            id: 3,
            type: 'Same Day',
            pay: 0.1
        }
    ]);

    const onShipping = (idShipping) => {
        let select = shipping.filter(val => val.id == idShipping);
        setSelectedShipping(select[0]);
        setDeliv(select[0].pay * totalHarga());
    }

    const printShipping = () => {
        return shipping.map((val, idx) => <option value={val.id} key={val.id}>{val.type} - Rp. {(totalHarga() * val.pay).toLocaleString()}</option>)
    }

    const handleDec = (item) => {
        let idUser = localStorage.getItem('eshopLog');
        let index = user.findIndex((val) => val.item == item)
        let tempUser = [...user]
        tempUser[index].qty = tempUser[index].qty - 1
        if (idUser) {
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: tempUser
            }
            ).then((res) => {
                getUser()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleInc = (item) => {
        let idUser = localStorage.getItem('eshopLog');
        let index = user.findIndex((val) => val.item == item)
        let indexProduct = data.findIndex((val) => val.name == item)
        let tempUser = [...user]
        if (tempUser[index].qty < data[indexProduct].stock) {
            tempUser[index].qty = tempUser[index].qty + 1
        }
        if (idUser) {
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: tempUser
            }
            ).then((res) => {
                getUser()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleDelete = (item) => {
        let idUser = localStorage.getItem('eshopLog');
        let index = user.findIndex((val) => val.item == item)
        let tempUser = [...user]
        tempUser.splice(index, 1)
        if (idUser) {
            Axios.patch(API_URL + `/users/${idUser}`, {
                cart: tempUser
            }
            ).then((res) => {
                getUser()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    React.useEffect(() => {
        getUser()
        getData()
    }, [])

    const printData = () => {
        return user.map((val, idx) => {
            return <Tr>
                <Td>
                    <div className='row'>
                        <div className='col-6'>
                            <img src={val.img} className='img-fluid bg-white' alt="" width={200} height={200}></img>
                        </div>
                        <div className='col-6 row'>
                            <span className='col-12 fs-3 ms-auto' >{val.item}</span>
                            <span className='col-12 fs-6 text-danger'>{val.brand}</span>
                            <span className='col-12 fs-6 text-primary' type='button' onClick={() => handleDelete(val.item)}>Remove</span>
                        </div>
                    </div>
                </Td>
                <Td><div>
                    <button className='btn border' type='button' onClick={val.qty > 1 ? () => handleDec(val.item) : null}>-</button>
                    <span className='text-center mx-2'>{val.qty}</span>
                    <button className='btn border' type='button' onClick={() => handleInc(val.item)}>+</button>
                </div></Td>
                <Td>Rp. {val.price.toLocaleString('id')}</Td>
                <Td>Rp. {(val.price * val.qty).toLocaleString('id')}</Td>
            </Tr >
        })
    }

    const totalHarga = () => {
        let total = 0
        user.map((val, idx) => {
            return total = total + (val.price * val.qty);
        })
        return total
    }

    const handleCheckout = () => {
        let idUser = localStorage.getItem('eshopLog');
        let tempUser = [...user];
        let tempData = [...data];
        console.log(tempData)
        if (idUser) {
            for (let i = 0; i < tempUser.length; i++) {
                for (let j = 0; j < tempData.length; j++) {
                    if (tempUser[i].item == tempData[j].name) {
                        Axios.patch(API_URL + `/products/${tempData[j].id}`, {
                            stock: tempData[j].stock - tempUser[i].qty
                        })
                            .then((response) => {
                                getData()
                            }).catch((error) => {
                                console.log(error)
                            })
                    }
                }
            }
        }
        Axios.post(API_URL + `/transaction`, {
            iduser: idUser,
            invoice: `INV//${new Date().getTime()}//00${Math.round(Math.random() * 1000000)}`,
            date: `${new Date().toLocaleString()}`,
            shop: user,
            total: totalHarga(),
            shipping: selectedShipping.type,
            deliv: deliv,
            status: 'Unpaid'
        }
        )
            .then((res) => {
                Axios.patch(API_URL + `/users/${idUser}`, {
                    cart: []
                }
                )
                    .then((res) => {
                        navigate('/transaction')
                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((err) => {
                console.log(err);
            })
    }

    return (<div id="product">
        <NavbarComponent />
        <div id="bg-product">
        </div>
        <div className='container w-100'>
            <div className='row rounded mt-3 p-4'>
                <div className='col-md-8 col-12'>
                    <div className='row'>
                        <div className='col-12 row'>
                            <span className='fs-1 col-md-10 col-12'>Shopping Cart</span>
                            <span className='fs-2 col-md-2 col-12'>{user.length} items</span>
                        </div>
                        <div className='col-12'>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Th>Product Detail</Th>
                                        <Th textAlign={'center'}>Quantity</Th>
                                        <Th textAlign={'center'}>Price</Th>
                                        <Th textAlign={'center'}>Total</Th>
                                    </Thead>
                                    <Tbody>
                                        {printData()}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-12'>
                    <div className='card' style={{ backgroundColor: '#F0FFFF' }}>
                        <div className='w-75 mt-3 mx-auto '>
                            <span className='fs-4 pt-5'>Order Summary</span>
                            <Divider className='mt-2 mb-4' />
                            <div className='row'>
                                <label className='col-6'>Items {user.length}</label>
                                <label className='col-6 text-center'>Rp. {totalHarga().toLocaleString('id')}</label>
                            </div>
                            <label className='fw-bold mt-5'>Shipping</label>
                            <select onChange={(e) => onShipping(e.target.value)} className='form-select py-3 my-3' >
                                <option value="0">Select Shipping</option>
                                {
                                    printShipping()
                                }
                            </select>
                            <label className='fw-bold mt-3'>Promo Code</label>
                            <input
                                type="text"
                                placeholder='Promo Code'
                                className='form-control py-3 my-3'
                            >
                            </input>
                            <button type='button' className='w-25 btn-danger btn-md border-0 rounded p-1 mb-5 align-items-center' >APPLY</button>
                            <Divider className='mt-2 mb-4' />
                            <div className='row'>
                                <label className='col-6'>Total Pembayaran</label>
                                <label className='col-6 text-center'>Rp. {(totalHarga() + deliv).toLocaleString('id')} </label>
                            </div>
                            <Button colorScheme='teal' size='lg' className='w-100 my-5' onClick={() => setToggle(!toggle)}>
                                Checkout
                            </Button>
                            <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Are you sure to Checkout?</ModalHeader>
                                    <ButtonGroup className='ms-auto p-3'>
                                        <Button type='button' variant='outline' colorScheme='yellow' onClick={() => {
                                            setToggle(!toggle)
                                        }}
                                        >Cancel</Button>
                                        <Button type='button' colorScheme='teal' onClick={() => {
                                            handleCheckout();
                                            setToggle(!toggle)
                                        }} >
                                            Checkout</Button>
                                    </ButtonGroup>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CartPage; 