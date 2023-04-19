import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllUsers = () => {
    
    const { data: users = [], refetch} = useQuery(({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-one-lyart.vercel.app/users');
            const data = await res.json();
            return data;
        }
    }));

    const handleMakeAdmin = (id) => {
        fetch(`https://doctors-portal-server-one-lyart.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization:  `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    toast.success('make admin successfull');
                    refetch();
                }
            })

    }

    return (
        <div>
            <h2 className='text-4xl font-bold text-green-800 text-center'>ALL USERS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>EMAIL</th>
                            <th>Admin Rool</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {
                                            user?.role !== 'admin' &&
                                            <button className='btn btn-primary btn-xs' onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>
                                        }
                                    </td>
                                    <td><button className='btn  btn-xs'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;