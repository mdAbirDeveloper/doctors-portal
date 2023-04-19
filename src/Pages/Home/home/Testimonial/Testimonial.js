import React from 'react';
import quote from '../../../../assets/icons/quote.svg'
import people1 from '../../../../assets/images/people1.png';
import people2 from '../../../../assets/images/people2.png';
import people3 from '../../../../assets/images/people3.png';
import Review from './Review';

const Testimonial = () => {

    const reviews = [
        {
            _id: 1,
            name: 'Winson Herry',
            img: people1,
            location: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
        },
        {
            _id: 2,
            name: 'Winson Herry',
            img: people2,
            location: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
        },
        {
            _id: 3,
            name: 'Winson Herry',
            img: people3,
            location: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
        },
    ]

    return (
        <section>
            <div className='my-16 flex justify-between'>

                <div>
                    <div>
                        <h4 className='text-xl font-bold text-primary '>Testimonial</h4>
                        <h2 className='text-4xl'>What Our Patients Says</h2>
                    </div>
                </div>
                <div>
                    <figure>
                        <img className='sm:w-24 lg:w-48' src={quote} alt='' />
                    </figure>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 mg:grid-cols-2 sm:grid-cols-1'>
                {
                    reviews.map(review => <Review key={review._id} review={review}></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;