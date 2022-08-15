import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { Text } from '@chakra-ui/react'
import { FaShoppingBag } from 'react-icons/fa'
import NavbarComponent from '../Components/NavbarBlack';
import {
    Divider,
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

const TransPage = () => {
    const [toggle, setToggle] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null)
    const [scroll, setScroll] = React.useState('inside')
    const [trans, setTrans] = React.useState([])
    console.log(trans)

    const getData = () => {
        let idUser = localStorage.getItem('eshopLog');
        if (idUser) {
            Axios.get(API_URL + `/transaction?iduser=${idUser}`)
                .then((res) => {
                    setTrans(res.data)
                }).catch((err) => {
                    console.log(err);
                })
        }
    }



    React.useEffect(() => {
        getData()
    }, [])

    const printData = () => {
        return trans.map((val, idx) => {
            return <div className='card row my-5' style={{ backgroundColor: '#F0FFFF' }}>
                <div className='col-12 d-flex p-3'>
                    <Text className='fw-bold d-flex'><FaShoppingBag size={20} /> Belanja {val.date}</Text>
                    <Text className='card ms-4 px-2' style={{ backgroundColor: 'red' }} >{val.status}</Text>
                    <Text className='ms-4'>{val.invoice}</Text>
                </div>
                <div className='d-flex'>
                    <div className='col-10 p-3'>
                        <div className='d-flex'>
                            <img src={val.shop[0].img} className='img-fluid ms-2' alt="" width={100} height={100}></img>
                            <div>
                                <span className='text-primary fw-bold fs-4 ms-2'>{val.shop[0].item}</span>
                                <br />
                                <span className='text-muted fs-6 ms-2'>{val.shop[0].qty} Barang x Rp.{val.shop[0].price.toLocaleString('id')}</span>
                                <br />
                                <br />
                                {val.shop.length == 1 ? null :
                                    <span type='button' className='text-muted fs-6 ms-2' onClick={() => {
                                        setToggle(!toggle);
                                        setSelectedData(val);
                                    }} >+{val.shop.length - 1} produk lainnya</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-2'>
                        <Text className='text-center fs-5'>Total Belanja</Text>
                        <Text className='text-center fs-5'>Rp. {(val.total + val.deliv).toLocaleString('id')}</Text>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='col-8'>
                    </div>
                    <div className='col-2 mb-5 mt-1' style={{ textAlign: 'right' }}>
                        <Text type='button' className='fw-bold text-center' style={{ color: 'green' }} onClick={() => {
                            setToggle(!toggle);
                            setSelectedData(val);
                        }} >Lihat Detail Transaksi</Text>
                    </div>
                    <div className='col-2 mb-5' style={{ textAlign: 'center' }}>
                        <button className='btn btn-success' style={{ width: 150 }}>Bayar</button>
                    </div>
                </div>
            </div >
        })
    }

    return (<div id="product">
        <NavbarComponent />
        <div id="bg-product">
        </div>
        <div className='container w-100'>
            <div className='row rounded mt-3 p-4'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-12 row'>
                            <span className='fs-1 col-md-10 col-12'>Transaction User</span>
                            <span className='fs-2 col-md-2 col-12' style={{ textAlign: 'right' }}>{trans.length} items</span>
                        </div>
                        <div className='col-12'>
                            {printData()}
                            {
                                selectedData ?
                                    <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='4xl' scrollBehavior={scroll} >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader style={{ textAlign: 'center' }} className='fs-2'>DETAIL TRANSAKSI</ModalHeader>
                                            <Divider className='mb-3' />
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <div className='row'>
                                                    <div className='col-8' >
                                                        <Text className='ms-2 fs-4'>UNPAID</Text>
                                                        <Divider className='my-3' />
                                                        <div className='d-flex'>
                                                            <Text className='ms-2'>No. Invoice</Text>
                                                            <Text className='ms-2 fw-bold ms-auto' style={{ color: 'green' }}>{selectedData.invoice}</Text>
                                                        </div>
                                                        <div className='d-flex mt-4'>
                                                            <Text className='ms-2'>Tanggal Pembelian</Text>
                                                            <Text className='ms-2 fw-bold ms-auto' style={{ color: 'green' }}>{selectedData.date}</Text>
                                                        </div>
                                                        <Divider className='my-3' />
                                                        <div>
                                                            <Text className='ms-2 fs-4'>Detail Produk</Text>
                                                            {selectedData.shop.map((value, index) => {
                                                                return <div className='card rounded ms-2 mb-3'>
                                                                    <div className='row'>
                                                                        <div className='col-8 d-flex mb-3'>
                                                                            <img src={value.img} className='img-fluid ms-2 mt-3' alt="" width={100} height={100}></img>
                                                                            <div className='mt-3'>
                                                                                <span className='text-primary fw-bold fs-4 ms-2'>{value.item}</span>
                                                                                <br />
                                                                                <span className='text-muted fs-6 ms-2'>{value.qty} x Rp.{value.price}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-4'>
                                                                            <Text className='text-center fs-5'>Total Harga</Text>
                                                                            <Text className='text-center fs-5 fw-bold'>Rp. {(value.qty * value.price).toLocaleString('id')}</Text>
                                                                            <div className='text-center'>
                                                                                <Button className='btn btn-outline-success my-3'>Beli Lagi</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                            }
                                                        </div>
                                                        <Divider className='my-3' />
                                                        <div>
                                                            <Text className='ms-2 fs-4 mb-4'>Info Pengiriman</Text>
                                                            <div className='d-flex'>
                                                                <Text className='ms-2 fs-5 text-muted'>Kurir : </Text>
                                                                <Text className='ms-2 fs-5 text-muted'>{selectedData.shipping}</Text>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <Text className='ms-2 fs-5 text-muted'>Penerima : </Text>
                                                                <Text className='ms-2 fs-5 text-muted'>Ariq</Text>
                                                            </div>
                                                        </div>
                                                        <Divider className='my-3' />
                                                        <div>
                                                            <Text className='ms-2 fs-4 mb-4'>Rincian Pembayaran</Text>
                                                            <div className='d-flex'>
                                                                <Text className='ms-2 fs-5 text-muted'>Total Harga</Text>
                                                                <Text className='ms-2 fs-5 text-muted ms-auto'>Rp. {selectedData.total.toLocaleString('id')}</Text>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <Text className='ms-2 fs-5 text-muted'>Ongkos Kirim</Text>
                                                                <Text className='ms-2 fs-5 text-muted ms-auto'>Rp. {selectedData.deliv.toLocaleString('id')}</Text>
                                                            </div>
                                                            <Divider className='my-3' />
                                                            <div className='d-flex'>
                                                                <Text className='ms-2 fs-4 text-muted fw-bold'>Total Belanja</Text>
                                                                <Text className='ms-2 fs-4 text-muted ms-auto fw-bold'>Rp. {(selectedData.total + selectedData.deliv).toLocaleString('id')}</Text>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-4 text-center'>
                                                        <Button type='button' colorScheme='teal' className='w-75 mb-3'
                                                        >
                                                            Bayar </Button>
                                                        <Button type='button' variant='outline' colorScheme='yellow' className='w-75' onClick={() => setToggle(!toggle)}
                                                        >Cancel</Button>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>
                                    : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TransPage;

{/* {val.shop.map((value, index) => {
                            return <div className='d-flex mb-3'>
                                <span className='fw-bold fs-4'>{value.qty}x</span>
                                <span className='text-primary fw-bold fs-4 ms-2'>{value.item}</span>
                                <img src={value.img} className='img-fluid ms-2' alt="" width={50} height={50}></img>
                            </div>
                        })
                        } */}