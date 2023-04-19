import React from 'react';
import Banner from './banner/Banner';
import Contect from './contect/Contect';
import Exceptional from './exceptional/Exceptional';
import InfoCards from './infoCards/InfoCards';
import MakeAppointment from './makeAppointment/MakeAppointment';
import Services from './services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Exceptional></Exceptional>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <Contect></Contect>
        </div>
    );
};

export default Home;