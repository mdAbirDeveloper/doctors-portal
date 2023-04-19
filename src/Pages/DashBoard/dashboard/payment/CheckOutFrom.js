import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutFrom = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCartError] = useState('');
    const [success, setSuccess] = useState('');
    const [processign, setProcessign] = useState(false);
    const [transectionId, settransectionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');


    const { price, patient, email, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-one-lyart.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        };


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCartError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCartError('');
        };

        setSuccess('');
        setProcessign(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email,
                    },
                },
            },
        );

        if (confirmError) {
            setCartError(confirmError.message);
            return;
        };

        if (paymentIntent.status === "succeeded") {
            console.log(card)
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            };
            fetch('https://doctors-portal-server-one-lyart.vercel.app/payments', {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.insertedId){
                    setSuccess('congrates ! Your payment i succeeded');
                    settransectionId(paymentIntent.id);
                }
            })
        };
        setProcessign(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-5 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processign}>
                    Pay
                </button>
            </form>
            <p className='text-red-500 font-bold'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500 font-bold'>{success}</p>
                    <p className='text-green-500 font-bold'>your transectionId is: <span className='text-black'> {transectionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckOutFrom;