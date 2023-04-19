import React from 'react';
import contectbg from '../../../../assets/images/appointment.png';
import PrimaryButton from '../../../../myComponents/primaryButton/PrimaryButton';

const Contect = () => {
    return (
        <div>
            <div className="hero my-28" style={{ background: `url(${contectbg})` }}>
                <div className="hero-content">
                    <div className="card flex-shrink-0 w-full  shadow-2xl ">
                        <div className="card-body">
                            <div className='text-center'>
                                <p className='text-primary font-bold'>Contect Us</p>
                                <h3 className='text-3xl text-white'>Stay connected with us</h3>
                            </div>
                            <div className="form-control">
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>
                            <div>
                                <textarea  className="textarea w-full" placeholder="your message"></textarea>
                            </div>
                            <div className="form-control text-center mt-5">
                                <PrimaryButton>Submit</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contect;