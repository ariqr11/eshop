import React, { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { AiFillEdit, AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { Button, Image, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import NavbarComponent from '../Components/NavbarBlack';


const ProductPage = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = React.useState(false); // untuk membuka/menutup modal
    const [toggleDelete, setToggleDelete] = React.useState(false); // untuk membuka/menutup modal
    const [img, setImg] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [selectedData, setSelectedData] = React.useState(null)
    const toast = useToast();
    const [dataFilter, setDataFilter] = React.useState({
        name: '',
        brand: '',
        category: ''
    });

    const handleAdd = () => {
        let formData = new FormData();
        formData.append('data', JSON.stringify({
            name,
            description,
            brand,
            category,
            price,
            stock
        }))
        formData.append('images', img);
        Axios.post(API_URL + '/products/add', formData).then((response) => {
            if (response.data.success) {
                toast({
                    title: "Product Added",
                    description: ``,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
                setToggle(!toggle);
                setImg('');
                setName('');
                setBrand('');
                setCategory('');
                setDescription('');
                setStock('');
                setPrice('');
                getData();
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const getData = () => {
        Axios.get(API_URL + '/products/all')
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getData()
    }, [])

    const PrintData = () => {
        return data.map((val, idx) => {
            return <Tr key={val.id}>
                <Td>{idx + 1}</Td>
                <Td><img src={API_URL + val.images} className='img-fluid bg-white' alt="" width={200} height={200}></img></Td>
                <Td>{val.name}</Td>
                <Td>{val.brand}</Td>
                <Td>{val.category}</Td>
                <Td>Rp. {parseInt(val.price).toLocaleString('id')}</Td>
                <Td><button type='button' className='btn-warning border rounded p-1'><AiFillEdit size={30} /></button>
                    <button type='button' className='btn-danger border rounded p-1' onClick={() => {
                        setSelectedData(val);
                        setToggleDelete(!toggleDelete);
                    }}><AiFillDelete size={30} /></button></Td>
            </Tr>
        })
    }


    const handleDelete = () => {
        Axios.delete(API_URL + `/products/delete?id=${selectedData.idproducts}`)
            .then((response) => {
                if (response.data.success) {
                    toast({
                        title: "Product Deleted",
                        description: `${name} success delete`,
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    })
                    getData()
                    setSelectedData(null);
                    setToggleDelete(!toggleDelete);
                }
            }).catch((error) => {
                console.log(error)
                toast({
                    title: "Error Deleted",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            })
    }

    const handleFilter = () => {
        console.log(dataFilter)
        let query = [];
        for (let prop in dataFilter) {
            if (dataFilter[prop] && dataFilter[prop] != "null") {
                query.push(`${prop}=${dataFilter[prop]}`)
            }
        }
        console.log("before", query);
        console.log("after", query.join('&'));
        Axios.get(API_URL + `/products?${query.join('&')}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleReset = () => {
        getData()
    }

    return (<div id="product">
        <NavbarComponent />
        <div className='container w-100 bg-white'>
            <div className='row'>
                <div className='col-10'>
                    <span className='fs-2 fw-bold'>Manage your products</span>
                    <br />
                    <span className='lead text-muted fs-6'>Prepare your product, so that customers can <span className='text-primary fw-bold'>transact more easily</span></span>
                </div>
                <div className='col-2 m-auto' style={{ textAlign: 'right' }}>
                    <Button colorScheme='teal' size='sm' onClick={() => setToggle(!toggle)}>
                        <AiOutlinePlusCircle size={30} />Add
                    </Button>
                    <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add your product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div className='row '>
                                    <div className='col-12 col-md-6'>
                                        <label className="form-label fw-bold text-muted">Image</label>
                                        <Image className='shadow-sm' boxSize='100% 50%' margin='auto' objectFit='cover' src={img} fallbackSrc='https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI=' alt='add-product' />
                                        <input className='form-control m-auto' onChange={(e) => setImg(e.target.files[0])} type='File' placeholder='URL image' />
                                        <label className="form-label fw-bold text-muted">Product Name</label>
                                        <input className='form-control m-auto' onChange={(e) => setName(e.target.value)} type='text' />
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label className="form-label fw-bold text-muted">Brand</label>
                                        <select className='form-select' onChange={(e) => setBrand(e.target.value)}>
                                            <option selected value={null}>Select brand</option>
                                            <option value='IKEA'>IKEA</option>
                                            <option value='ACE'>ACE</option>
                                            <option value='Mr. DIY'>Mr. DIY</option>
                                        </select>
                                        <label className="form-label fw-bold text-muted">Category</label>
                                        <select className='form-select' onChange={(e) => setCategory(e.target.value)}>
                                            <option selected value={null}>Select category</option>
                                            <option value='Livingroom'>Livingroom</option>
                                            <option value='Bedroom'>Bedroom</option>
                                            <option value='Kitchen'>Kitchen</option>
                                        </select>
                                        <label className="form-label fw-bold text-muted">Description</label>
                                        <textarea className='form-control m-auto' onChange={(e) => setDescription(e.target.value)} type='text' />
                                        <label className="form-label fw-bold text-muted">Stock</label>
                                        <input className='form-control m-auto' onChange={(e) => setStock(parseInt(e.target.value))} type='text' />
                                        <label className="form-label fw-bold text-muted">Price</label>
                                        <input className='form-control m-auto' onChange={(e) => setPrice(parseInt(e.target.value))} type='text' />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' className='btn btn-success text-white' onClick={handleAdd}>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    {
                        selectedData ?
                            <Modal isOpen={toggleDelete} onClose={() => setToggleDelete(!toggleDelete)}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Are you sure to delete <span className='fw-bold main-color'> {selectedData.name}</span>?</ModalHeader>
                                    <ModalFooter>
                                        <ButtonGroup>
                                            <Button type='button' variant='outline' colorScheme='yellow' onClick={() => {
                                                setSelectedData(null);
                                                setToggleDelete(!toggleDelete)
                                            }}
                                            >No</Button>
                                            <Button type='button' variant='outline' colorScheme='teal' onClick={handleDelete} >
                                                Yes</Button>
                                        </ButtonGroup>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            : null
                    }
                </div>
            </div>
            <div className='card row rounded mt-3 p-4'>
                <div className='col-12'>
                    <span className='fs-4 text-muted p-3'>Filter</span>
                </div>
                <div className='d-flex p-4'>
                    <div className='col-md-3 col-12'>
                        <input
                            type="text"
                            name="username"
                            placeholder='name'
                            className='w-75 form-control'
                            onChange={(e) => setDataFilter({ ...dataFilter, name: e.target.value })}
                        >
                        </input>
                    </div>
                    <div className='col-md-3 col-12'>
                        <select className='form-select w-75' onChange={(e) => setDataFilter({ ...dataFilter, brand: e.target.value })}>
                            <option value="null">Select brand</option>
                            <option value='IKEA'>IKEA</option>
                            <option value='ACE'>ACE</option>
                            <option value='Mr. DIY'>Mr. DIY</option>
                        </select>
                    </div>
                    <div className='col-md-3 col-12'>
                        <select className='form-select w-75' onChange={(e) => setDataFilter({ ...dataFilter, category: e.target.value })}>
                            <option value="null">Select category</option>
                            <option value='Livingroom'>Livingroom</option>
                            <option value='Bedroom'>Bedroom</option>
                            <option value='Kitchen'>Kitchen</option>
                        </select>
                    </div>
                    <div className='col-md-3 col-12 justify-content-between'>
                        <div className='btn-group justify-content-between'>
                            <button type='button' className='btn-success btn-lg border rounded p-1' style={{ width: 100 }} onClick={handleFilter}> Filter</button>
                            <button type='button' className='btn-outline-warning border rounded p-1 ms-5' style={{ width: 100 }} onClick={handleReset}> Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='container mt-5 bg-white'>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>NO</Th>
                            <Th>PREVIEW</Th>
                            <Th>NAME</Th>
                            <Th>BRAND</Th>
                            <Th>CATEGORY</Th>
                            <Th>PRICE</Th>
                            <Th>ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {PrintData()}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    </div >
    )
}



export default ProductPage