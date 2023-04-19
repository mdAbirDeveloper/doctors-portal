import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../../assets/icons/clock.svg';
import marker from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';

const InfoCards = () => {

    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00 pm everyday',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: 'Visit our location',
            description: 'Brooklyn, NY 10036, United States',
            icon: marker,
            bgClass: 'bg-neutral'
        },
        {
            id: 3,
            name: 'Contact us now',
            description: '+000 123 456789',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-secondary to-primary'
        }
    ]

    return (
        <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-16'>
            {
                cardData.map(datas => <InfoCard cardData={datas} key={datas.id}></InfoCard>)
            }

        </div>
    );
};

export default InfoCards;