import React from 'react';

const Service = ({ service }) => {
    const {name, description, icon} = service;
    return (
        <div>
            <div className="card shadow-xl">
                <figure><img src={icon} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                    </h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Service;