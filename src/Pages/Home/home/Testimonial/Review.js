import React from 'react';

const Review = ({ review }) => {
    const { name, img, review: userRivies, location } = review;
    return (
        <div>
            <div className="card shadow-xl">
                <div className="card-body">
                    <p>{userRivies}</p>
                    <div className="flex mt-3">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className='mt-3 ml-5'>
                            <p>{name}</p>
                            <p>{location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;