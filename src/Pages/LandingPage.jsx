import React from 'react';
import img1 from './lemari.jpg'
import img2 from './meja.jpg'
import img3 from './kursi.jpg'
import NavbarComponent from '../Components/Navbar';

const LandingPage = (props) => {
    return (<div >
        <div id="landing">
            <NavbarComponent />
            <div className='' style={{ marginTop: 500 }}>
                <div className='row d-flex'  >
                    <div className='col-6 d-none d-md-block'>
                    </div>
                    <div className='col-md-6 col-12 card shadow' style={{ backgroundColor: '#5486a7', opacity: 0.7 }}>
                        <div id="carouselExampleControls" className="carousel slide w-100" data-bs-ride="carousel">
                            <div className="carousel-inner w-100">
                                <div className="carousel-item active w-100">
                                    <div className='d-flex flex-row p-4 fs-2'>
                                        <h1>Find your best <b>Livingroom</b> furniture </h1>
                                    </div>
                                    <div>
                                        <p className='w-75 p-4 fs-5'>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero facere rerum adipisci quod voluptatibus? In, laborum eaque non perspiciatis temporibus delectus vitae dolor fugit expedita facere deserunt mollitia recusandae dolorum.
                                        </p>
                                    </div>
                                    <div className='pb-5 w-75 ' style={{ textAlign: 'right' }}>
                                        <button type='button' className='btn btn-danger btn-sm w-25 '>Buy Now</button>
                                    </div>
                                </div>
                                <div className="carousel-item w-100">
                                    <div className='d-flex flex-row p-4 fs-2'>
                                        <h1>Find your best <b>Kitchen</b> furniture </h1>
                                    </div>
                                    <div>
                                        <p className='w-75 p-4 fs-5'>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero facere rerum adipisci quod voluptatibus? In, laborum eaque non perspiciatis temporibus delectus vitae dolor fugit expedita facere deserunt mollitia recusandae dolorum.
                                        </p>
                                    </div>
                                    <div className='pb-5 w-75' style={{ textAlign: 'right' }} >
                                        <button type='button' className='btn btn-danger btn-sm w-25 '>Buy Now</button>
                                    </div>
                                </div>
                                <div className="carousel-item w-100">
                                    <div className='d-flex flex-row p-4 fs-2'>
                                        <h1>Find your best <b>Bedroom</b> furniture </h1>
                                    </div>
                                    <div>
                                        <p className='w-75 p-4 fs-5'>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero facere rerum adipisci quod voluptatibus? In, laborum eaque non perspiciatis temporibus delectus vitae dolor fugit expedita facere deserunt mollitia recusandae dolorum.
                                        </p>
                                    </div>
                                    <div className='pb-5 w-75' style={{ textAlign: 'right' }}>
                                        <button type='button' className='btn btn-danger btn-sm w-25 '>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div >
                </div >
            </div>
        </div>
        <div>
            <div className='container' style={{ marginTop: 300 }}>
                <div className='row d-flex flex-row-reverse w-100'>
                    <div className='col-12 col-md-6 m-auto '>
                        <h2 className='fw-bold text-center fs-2'> Lemari Serba Guna</h2>
                        <p className='text-center m-5 fs-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dignissimos molestias totam nisi iusto ab ducimus odio, aliquid minus cumque corrupti perferendis obcaecati sed, inventore repellat id maiores, beatae sit.
                        </p>
                    </div>
                    <div className='col-12 col-md-6'>
                        <img src={img1} className='img-fluid w-100' alt=""></img>
                    </div>
                </div>
                <div className='row d-flex w-100 mt-5'>
                    <div className='col-12 col-md-6 m-auto '>
                        <h2 className='fw-bold text-center fs-2'> Meja Serba Guna</h2>
                        <p className='text-center m-5 fs-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dignissimos molestias totam nisi iusto ab ducimus odio, aliquid minus cumque corrupti perferendis obcaecati sed, inventore repellat id maiores, beatae sit.
                        </p>
                    </div>
                    <div className='col-12 col-md-6'>
                        <img src={img2} className='img-fluid w-100' alt=""></img>
                    </div>
                </div>
                <div className='row d-flex flex-row-reverse w-100 mt-5'>
                    <div className='col-12 col-md-6 m-auto'>
                        <h2 className='fw-bold text-center fs-2'> Kursi Serba Guna</h2>
                        <p className='text-center m-5 fs-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dignissimos molestias totam nisi iusto ab ducimus odio, aliquid minus cumque corrupti perferendis obcaecati sed, inventore repellat id maiores, beatae sit.
                        </p>
                    </div>
                    <div className='col-12 col-md-6'>
                        <img src={img3} className='img-fluid w-100' alt=""></img>
                    </div>
                </div>
            </div>
        </div >
    </div >
    )
}

export default LandingPage;
