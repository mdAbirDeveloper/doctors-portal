import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appintmentOption, setAppointmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    const {data: appointmentOption = [], refetch} = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async() =>{
            const res = await fetch(`https://doctors-portal-server-one-lyart.vercel.app/appointmentOption?date=${date}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='my-10'>
            <p className='text-green-800 font-bold bg-slate-300 rounded-lg pl-10 mx-auto lg:w-1/4'>Available Services on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>{
                treatment &&
                <BookingModal
                    setTreatment={setTreatment}
                    treatment={treatment}
                    selectedDate={selectedDate}
                    refetch = {refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;