import React from 'react';

import hero from '../../asset/images/hero.jpg';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

import About from '../../components/about';
import Categories from '../../components/categories';
import PropertySlider from '../../components/propertySlider';
import PropertyTypes from '../../components/propertyTypes';
import FeaturedProperties from '../../components/featuredProperties';
import Testimonial from '../../components/clientOne';
import GetInTuch from '../../components/getInTuch';



export default function IndexThree(){

    return (
        <React.Fragment>
             {/* Navbar */}
             <Navbar navClass="nav-sticky" logolight={false} menuClass="navigation-menu nav-left" />
            <section className="bg-half-260 d-table w-100" style={{ background: `url(${hero})` }} id="home">
            </section>
               {/* categories */}
            <section className="section">
                <Categories/>
            </section>
             {/* About */}
              <section className="section bg-light">
                <About/>
              </section>
                {/* property slide */}
             <PropertySlider/>
            {/* Property types */}
            <PropertyTypes/>
               {/* Featured property */}
             <FeaturedProperties/>
               {/* Testimonial */}
               <Testimonial/>
                 {/* GetInTuch */}
                 <GetInTuch/>
                  {/* Footer */}
             <Footer/>
        </React.Fragment>
    );
}
