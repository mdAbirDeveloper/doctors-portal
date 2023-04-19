import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {
    const { name, slots, price } = option;
    return (
        <div className='mt-10 text-white'>
            <div className="card shadow-xl bg-slate-500">
                <div className="card-body text-center">
                    <h2 className="text-center text-2xl font-bold text-secondary">{name}</h2>
                    <p className='text-xl'>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                    <p className='text-xl'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                    <p><small>Price:  ${price}</small></p>
                    <div className="card-actions justify-center">
                        <label
                            disabled={slots.length === 0}
                            htmlFor="Boking-modal"
                            className="btn btn-primary"
                            onClick={() => { setTreatment(option) }}
                        >Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;