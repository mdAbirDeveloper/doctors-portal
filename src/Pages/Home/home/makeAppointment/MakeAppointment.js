import React from 'react';
import doctorimg from '../../../../assets/images/doctor.png'
import appointment from '../../../../assets/images/appointment.png'
import PrimaryButton from '../../../../myComponents/primaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <div className='mt-32' style={{background: `url(${appointment})`}}>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctorimg} className="lg:w-1/2 -mt-32 hidden lg:block md:block rounded-lg shadow-2xl" alt=''/>
                    <div>
                        <p className='text-xl text-secondary font-bold'>Apppointment</p>
                        <h1 className="text-4xl font-bold text-white">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;