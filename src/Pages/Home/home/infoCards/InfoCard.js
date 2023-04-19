import React from 'react';

const InfoCard = ({ cardData }) => {
    const { name, description, icon, bgClass } = cardData;
    // console.log(cardData.name)
    return (
            <div className={`${bgClass} rounded-lg`}>
                <div className="card md:card-side lg:pl-6 md:pl-6 shadow-xl">
                    <figure><img className='mt-6' src={icon} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-white">{name}</h2>
                        <p className='text-white'>{description}</p>
                    </div>
                </div>
            </div>
    );
};

export default InfoCard;