import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading/Loading';

const AddDoctors = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKye = process.env.REACT_APP_IMGbb_KEY;

    const navigate = useNavigate();

    const { data: specialties, isLoading, } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-one-lyart.vercel.app/appoinementSpecialty');
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctors = data => {
        const image = data.img[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKye}`;
        //conver image to link with imagebb
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log('this is from doctors image', imgData);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                };

                //seve doctors informaiton to the dataBase
                fetch('https://doctors-portal-server-one-lyart.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        toast.success('Doctor add successfully');
                        navigate('/dashboard/manageDoctors')
                    })

            })
    };

    if (isLoading) {
        return <Loading></Loading>
    };

    return (
        <div className='w-96'>
            <h2 className='text-3xl mb-5 text-center font-bold text-green-800'>ADD A DOCTOR</h2>
            <form onSubmit={handleSubmit(handleAddDoctors)}>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">NAME</span></label>
                    <input
                        {...register('name', { required: true })}
                        type="text" className=" input input-bordered w-full " />
                    {errors.name && <span className='text-red-600'>This field is required</span>}
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">EMAIL</span></label>
                    <input {...register('email', { required: true })}
                        type="email" className=" input input-bordered w-full " />
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">Speacialty</span></label>
                    <select className="select input-bordered w-full"
                        {...register('specialty')}
                    >
                        {
                            specialties?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                                required
                            >{specialty.name}</option>)
                        }

                    </select>
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">Phote</span></label>
                    <input {...register('img', { required: true })}
                        type="file" className=" input input-bordered w-full "
                    />
                    {errors.email && <span className='text-red-600'>Photo is required</span>}
                </div>


                <input className="btn w-full" value='Add A Doctor' type="submit" />

            </form>
        </div>
    );
};

export default AddDoctors;