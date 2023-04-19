import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../../Loading/Loading';
import ConfermationModal from '../../../Shared/confermaitonModal/ConfermationModal';

const ManageDoctors = () => {
    const [deletingDoctors, setDeletingDoctors] = useState(null);
    const closeModal = () =>{
        setDeletingDoctors(null);
    };

    const { data: docInfo, isLoading , refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-one-lyart.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch {

            }
        }
    });

    const handleDeleteDoctors = (doctor) =>{
        fetch(`https://doctors-portal-server-one-lyart.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearere ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                console.log(data);
                refetch();
                toast.success('doctors deleted success fully')
            }
        })
        
    };

    if (isLoading) {
        return <Loading></Loading>
    };

    return (
        <div>
            <h2 className='text-3xl mb-5 text-center font-bold text-green-800'>THIS IS MANAGE DOCTOR</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>specialty</th>
                                <th>image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                docInfo &&
                                docInfo?.map((doctors, i) =>
                                    <tr key={doctors._id}>
                                        <th>{i + 1}</th>
                                        <td>{doctors.name}</td>
                                        <td>{doctors.email}</td>
                                        <td>{doctors.specialty}</td>
                                        <td><img className='w-16 rounded-full' src={doctors.image} alt="" /></td>
                                        <td>
                                            <label onClick={() =>setDeletingDoctors(doctors)} htmlFor="confermation-modal" className="btn btn-xs btn-error">Delete</label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {
                    deletingDoctors && <ConfermationModal
                    title={`are you sure you want to delete ?`}
                    message={`if you delete ${deletingDoctors.name} . it cannot be undone`}
                    successAction = {handleDeleteDoctors}
                    successButtonName = 'Delete'
                    modalData = {deletingDoctors}
                    closeModal={closeModal}
                    ></ConfermationModal>
                }
            </div>
        </div>
    );
};

export default ManageDoctors;