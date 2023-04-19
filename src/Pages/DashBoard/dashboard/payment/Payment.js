import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutFrom from './CheckOutFrom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

console.log(stripePromise)

const Payment = () => {
    const booking = useLoaderData();

    return (
        <div>
            <h2 className='text-3xl'>Payment for <span className='text-primary font-bold'>{booking.treatment}</span></h2>
            <p className='text-xl font-bold text-green-800'>Please Pay {booking.price} for your appointment on {booking.appointmentDate} at {booking.slot}</p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom booking={booking}></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;