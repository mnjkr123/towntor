import React, { useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
/* eslint-disable-next-line no-unused-vars */
import { categories, price, houseTypes, bedrooms, bathrooms, parking, yearBuilt, plotSizes, nearBy, interiorDesigns, facings, additionalFeatures } from '../../data/filterData';
import background from '../../asset/images/bg.png';
import bg3 from '../../asset/images/bg/03.jpg';
import bg5 from '../../asset/images/bg/05.jpg';

import AboutUs from '../../components/about';
import Broker from '../../components/broker';
import ClientTwo from "../../components/clientTwo";
import FilterForm from "../../components/FilterForm";
import Blog from "../../components/blog";
import PropertyType from "../../components/propertyTypes";
import FooterTopImage from "../../components/FoterTopImage";
import Footer from "../../components/footer";

import { propertyData } from '../../data/data';
import CountUp from 'react-countup';
import TinySlider from "tiny-slider-react";
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

import { FiHome, FiHeart, FiCamera } from "../../asset/icons/vander";

export default function IndexSeven() {

    const [formData, setFormData] = useState({
        categories: null,
        minPrice: null,
        maxPrice: null,
        houseType: null,
        bedrooms: null,
        bathrooms: null,
        parking: null,
        yearBuilt: null,
        plotSize: null,
        nearBy: null,
        interiorDesign: null,
        facing: null,
        additionalFeatures: null,
      });

      const handleChange = (selectedOption, fieldName) => {
        setFormData({ ...formData, [fieldName]: selectedOption });        
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const submitData = {...formData};
        try {
          await axios.post('https://3000-idx-towntorgit-1744520911933.cluster-2xfkbshw5rfguuk5qupw267afs.cloudworkstations.dev/api/submitForm', submitData);
          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
        }



      };

    const settings = {
        container: '.tiny-slide-three',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: 'bottom',
        controlsText: [
            '<i class="mdi mdi-chevron-left "></i>',
            '<i class="mdi mdi-chevron-right"></i>',
        ],
        nav: false,
        speed: 400,
        gutter: 30,
        responsive: {
            1025: {
                items: 3,
            }, 
            992: {
                items: 2,
            },
            767: {
                items: 2,
            }, 
            320: {
                items: 1,
            },
        },
    };

    return (
        <>
            <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu"/>
            <section className="bg-half-170 d-table w-100 pb-0" style={{ backgroundImage: `url(${background})`, backgroundPosition: 'bottom' }}>
            <div className="bg-overlay bg-primary-gradient-overlay z-n1"></div>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 text-center">
                            <div className="title-heading text-center">
                                <h4 className="heading fw-bold title-dark mb-3">Are you ready to find your dream home</h4>
                                <p className="para-desc text-muted title-dark mx-auto mb-0">A great platform to buy, sell and rent your properties without any agent or commisions.</p>
                                <form onSubmit={handleSubmit} className="mt-4">
                                <div className="row justify-content-center mt-4 pt-2">
                                    <div className="filter-form-container" style={{ flexGrow: 1 }}>
                                        <FilterForm
                                            formData={formData}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                        />
                                    </div>
                                    <div className="button-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }}>
                                         <button type="submit" className="btn btn-primary rounded-3">Search</button>
                                    </div>
                                </div>                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
            </section>
            <div className="container">
                <div className="row" style={{ marginTop: '-54px' }}>
                    <img src={bg3} className="img-fluid rounded-3" alt="" style={{marginTop:'5rem', width: '100%'}} />
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <AboutUs/>
                </div>

                <div className="container mt-100 mt-60">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Property Types</h4>
                                <p className="text-muted para-desc mx-auto mb-0">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                            </div>
                        </div>
                    </div>
                    <PropertyType/>
                </div>

                <div className="container mt-100 mt-60">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Featured Properties</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="tiny-slide-three">
                                <TinySlider settings={settings}>
                                    {propertyData.map((item, index) => (
                                        <div className="tiny-slide" key={index}>
                                            <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                                                <div className="property-image position-relative overflow-hidden shadow">
                                                    <img src={item.image} className="img-fluid" alt=""/>
                                                    <ul className="list-unstyled property-icon">
                                                        <li className=""><Link to={`/property-detail/${item.id}`} className="btn btn-sm btn-icon btn-pills btn-primary"><FiHome className="icons"/></Link></li>
                                                        <li className="mt-1"><Link to={`/property-detail/${item.id}`} className="btn btn-sm btn-icon btn-pills btn-primary"><FiHeart className="icons"/></Link></li>
                                                        <li className="mt-1"><Link to={`/property-detail/${item.id}`} className="btn btn-sm btn-icon btn-pills btn-primary"><FiCamera className="icons"/></Link></li>
                                                    </ul>
                                                </div>
                                                <div className="card-body content p-4">
                                                    <Link to={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">10765 Hillshire Ave, Baton Rouge, LA 70810, USA</Link>

                                                    <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                                        <li className="d-flex align-items-center me-3">
                                                            <i className="mdi mdi-arrow-expand-all fs-5 me-2 text-primary"></i>
                                                            <span className="text-muted">8000sqf</span>
                                                        </li>
                        
                                                        <li className="d-flex align-items-center me-3">
                                                            <i className="mdi mdi-bed fs-5 me-2 text-primary"></i>
                                                            <span className="text-muted">4 Beds</span>
                                                        </li>
                        
                                                        <li className="d-flex align-items-center">
                                                            <i className="mdi mdi-shower fs-5 me-2 text-primary"></i>
                                                            <span className="text-muted">4 Baths</span>
                                                        </li>
                                                    </ul>
                                                    <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                        <li className="list-inline-item mb-0">
                                                            <span className="text-muted">Price</span>
                                                            <p className="fw-medium mb-0">$5000</p>
                                                        </li>
                                                        <li className="list-inline-item mb-0 text-muted">
                                                            <span className="text-muted">Rating</span>
                                                            <ul className="fw-medium text-warning list-unstyled mb-0">
                                                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                                                <li className="list-inline-item mb-0 text-dark">5.0(30)</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </TinySlider>
                            </div>
                        </div>

                        <div className="col-12 pt-2">
                            <div className="text-center">
                                <Link to="/grid" className="mt-3 fs-6 text-primary">View More Properties <i className="mdi mdi-arrow-right align-middle"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-100 mt-60">
                    <div className="position-relative overflow-hidden rounded-3 shadow py-5" style={{backgroundImage:`url(${bg5})`,backgroundPosition:'center', backgroundAttachment:'fixed'}}>
                        <div className="bg-overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-4 py-3">
                                    <div className="counter-box text-center">
                                        <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={1548} className="counter-value"/>+</h1>
                                        <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Investment</h6>
                                    </div>
                                </div>
            
                                <div className="col-4 py-3">
                                    <div className="counter-box text-center">
                                        <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={25} className="counter-value"/>+</h1>
                                        <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Awards</h6>
                                    </div>
                                </div>
            
                                <div className="col-4 py-3">
                                    <div className="counter-box text-center">
                                        <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={9} className="counter-value"/>+</h1>
                                        <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Profitability</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-100 mt-60">
                    <Broker/>
                </div>

                <div className="container mt-100 mt-60">
                    <ClientTwo/>
                </div>

                <div className="container mt-100 mt-60">
                    <Blog/>
                </div>
            </section>
            <FooterTopImage/>
            <Footer/> 
        </>
    );
}
