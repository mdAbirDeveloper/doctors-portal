import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import useToken from '../../../Hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { creatUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();


    if(token){
        navigate('/')
    }

    const handleSignUp = data => {
        setSignUpError('')
        creatUser(data.email, data.password)
            .then(result => {
                toast('user created successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        seveUser(data.name, data.email, data.password);
                    })
                    .catch(error => {
                        console.log(error)
                        setSignUpError(error.message)
                    })
            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message)
            })
    };

    const seveUser = (name, email, password) => {
        const user = { name, email, password };
        fetch('https://doctors-portal-server-one-lyart.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    };


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-xl text-center'>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

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
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register('password', {
                            required: 'you canton signUp withOut password',
                            minLength: { value: 6, message: 'password is should be lognger then 6 chareacters' },
                            pattern: { value: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/, message: 'you should use atlast one number is your password' }
                        })}
                            type="password" className="input input-bordered w-full " />
                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                        <p className='text-red-600'>{signUpError}</p>
                        <p className='my-4'>Allready have an Account? <Link className='text-primary' to='/login'>Please Login</Link> </p>
                    </div>

                    <input className="btn w-full" value='Sign Up' type="submit" />

                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider">OR</div>
                        <div className="w-full btn btn-outline">Continue With Google</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;