import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate , setTreatment, refetch}) => {
    /*treatment is just another name of option with name, slots, _id*/
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP');
    const {user} = useContext(AuthContext)

    const handleBoking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patientname = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: patientname,
            slot,
            email,
            phone,
            price
        }

        // TODO : sent data to the server 
        // and once data is saved then close the modal
        //and display success toast
        fetch('https://doctors-portal-server-one-lyart.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.acknowledged){
                setTreatment(null)
                toast.success('BOOking Confirmed');
                refetch();
            }else{
                toast.error(data.message)
            }
        })

        
        console.log(booking)
    }

    return (
        <>
            <input type="checkbox" id="Boking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form onSubmit={handleBoking}>
                        <label htmlFor="Boking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <input defaultValue={date} className="input font-bold w-full border mb-3 input-bordered" />
                        <select name='slot' className="select select-bordered w-full">

                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" disabled defaultValue={user?.displayName} placeholder="Full Name" className="input w-full border mb-3 mt-3 input-bordered" required />
                        <input name='email' type="email" disabled defaultValue={user?.email} placeholder="Your Email" className="input w-full mb-3 input-bordered" required />
                        <input name='phone' type="text" placeholder="Phone number" className="input w-full mb-3 input-bordered" required />
                        <button className="btn w-full">SUBMIT</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;