import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { useEffect } from 'react';
import CountUp from 'react-countup';
import TinySlider from "tiny-slider-react";
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

import { FiHome, FiHeart, FiCamera } from "../../asset/icons/vander";
import { AuthContext } from '../../pages/auth/auth-signup';

export default function IndexSeven() {
    const navigate = useNavigate();

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

      const { user } = useContext(AuthContext);
      const handleChange = (selectedOption, fieldName) => {
        setFormData({ ...formData, [fieldName]: selectedOption });
      };
    
    const handleSubmit = async (event) => {
      console.log("handleSubmit index-seven")
        event.preventDefault();
        
        const submitData = { ...formData };
        // Parse the data to get the label
        if (user) {
            if(!submitData.userEmail){
                submitData.userEmail = user.email;
            }
            
            try{
                const checkData = await axios.post('/api/checkFormData', submitData);
                if(checkData.data.dataExists){
                    console.log("Form data already exists for this user");
                    return;
                }
            }catch(error){
                console.error('Error checking form data:', error);
            }
            
        }

        for (const key in submitData) {
            if (submitData[key] && typeof submitData[key] === 'object' && 'label' in submitData[key]) {
                submitData[key] = submitData[key].label;
            }
        }

        if (!user) {
            console.log("submitData before localStorage:", submitData);
            localStorage.setItem('formData', JSON.stringify(submitData));
            navigate('/auth-login', { state: { from: '/index-seven' } });            
            return;
        }
        
        for (const key in submitData) {
            if (submitData[key] && typeof submitData[key] === 'object' && 'label' in submitData[key]) {
                submitData[key] = submitData[key].label;
            }
        }

        submitData.userEmail = user.email; 
    
        try {
          await axios.post('/api/submitForm', submitData);
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
                                         <button type="submit" className="btn btn-primary rounded-3">Sumbit</button>
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

            <FooterTopImage/>
            <Footer/> 
        </>
    );
}
