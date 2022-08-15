import React, { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import NavbarComponent from '../Components/NavbarBlack';
import { useNavigate } from 'react-router-dom';


const ProductUserPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [tempData, setTempData] = React.useState([])
    const [dataFilter, setDataFilter] = React.useState({
        name: '',
        brand: '',
        category: '',
    });
    const [priceMin, setPriceMin] = React.useState(0)
    const [priceMax, setPriceMax] = React.useState(0)

    const getTempData = () => {
        Axios.get(API_URL + '/products/all')
            .then((res) => {
                setTempData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        getTempData()
    }, [])

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

    const printData = () => {
        return data.map((val, idx) => {
            return <div className='col-md-4 col-12 p-3 btn' onClick={() => navigate(`/product/detail?id=${val.id}`, {
                state: val
            })}>
                <div>
                    <img src={API_URL + val.images} className='img-fluid bg-white shadow border mx-3' alt="" width={500} height={500}></img>
                    <div className='position-relative'>
                        <div className='card shadow-lg w-50 position-absolute top-50 start-50 translate-middle' style={{ backgroundColor: '#ff99ff' }}>
                            <span className='text-center text-dark'>Rp. {parseInt(val.price).toLocaleString('id')}</span>
                            <span className='text-center text-dark'>{val.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    const handleFilter = () => {
        let filterHarga = []
        for (let i = 0; i < tempData.length; i++) {
            if ((priceMin && priceMax)) {
                if (priceMin - tempData[i].price < 0 && priceMax - tempData[i].price > 0) {
                    filterHarga.push(`price=${tempData[i].price}`)
                }
            } else if ((priceMin == 0 || priceMin) && !priceMax) {
                if (priceMin - tempData[i].price < 0) {
                    filterHarga.push(`price=${tempData[i].price}`)
                }
            } else if (!priceMin && priceMax) {
                if (priceMax - tempData[i].price > 0) {
                    filterHarga.push(`price=${tempData[i].price}`)
                }
            }
        }

        let query = [];
        for (let prop in dataFilter) {
            if (dataFilter[prop] && dataFilter[prop] !== "null") {
                query.push(`${prop}=${dataFilter[prop]}`)
            }
        }

        if ((priceMin && priceMax) || ((priceMin == 0 || priceMin) && !priceMax) || (!priceMin && priceMax)) {
            if (filterHarga.length > 0) {
                Axios.get(API_URL + `/products?${query.join('&')}&${filterHarga.join('&')}`)
                    .then((res) => {
                        setData(res.data)
                        filterHarga = [];
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                Axios.get(API_URL + `/products/?${query.join('&')}&price=0`)
                    .then((res) => {
                        setData(res.data)
                        filterHarga = [];
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    const handleReset = () => {
        getData()
    }

    return (<div id="product-user">
        <NavbarComponent />
        <div id="bg-product">
        </div>
        <div className='container w-100 bg-white'>
            <div className='row'>
                <div className='col-10'>
                    <span className='fs-1 fw-bold'>Our Arrival products</span>
                    <br />
                    <span className='lead text-muted fs-6'>Choose product and <span className='text-primary fw-bold'>transact more easily</span></span>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='card col-md-3 mt-3 col-12' style={{ backgroundColor: '#3399ff', maxHeight: 500 }}>
                    <span className='fs-4 text-white pt-3'>Filter</span>
                    <input
                        type="text"
                        name="username"
                        placeholder='Name'
                        className='w-100 form-control py-3 my-3'
                        onChange={(e) => setDataFilter({ ...dataFilter, name: e.target.value })}
                    >
                    </input>
                    <select className='form-select w-100 py-3 my-3' onChange={(e) => setDataFilter({ ...dataFilter, brand: e.target.value })}>
                        <option value="null">Select brand</option>
                        <option value='IKEA'>IKEA</option>
                        <option value='ACE'>ACE</option>
                        <option value='Mr. DIY'>Mr. DIY</option>
                    </select>
                    <select className='form-select w-100 py-3 my-3' onChange={(e) => setDataFilter({ ...dataFilter, category: e.target.value })}>
                        <option value="null">Select category</option>
                        <option value='Livingroom'>Livingroom</option>
                        <option value='Bedroom'>Bedroom</option>
                        <option value='Kitchen'>Kitchen</option>
                    </select>
                    <div className='d-flex justify-content-between'>
                        <input type='number'
                            placeholder='Minimum'
                            className='w-50 form-control py-3 my-3'
                            onChange={(e) => setPriceMin(e.target.value)}
                        />
                        <input type='number'
                            placeholder='Maximum'
                            className='w-50 form-control py-3 my-3'
                            onChange={(e) => setPriceMax(e.target.value)}
                        />
                    </div>
                    <div className='btn-group justify-content-between py-3 my-3'>
                        <button type='button' className='btn-success btn-lg border-0 rounded p-1' style={{ width: 100 }} onClick={handleFilter}> Filter</button>
                        <button type='button' className='btn-warning border-0 rounded p-1 ms-2' style={{ width: 100 }} onClick={handleReset}> Reset</button>
                    </div>
                </div>
                <div className='row col-md-9 col-12'>
                    {printData()}
                </div>
            </div>
        </div >

    </div>
    )
}



export default ProductUserPage