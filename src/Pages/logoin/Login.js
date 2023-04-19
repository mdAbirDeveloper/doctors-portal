import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit  } = useForm();
    const {signInUser} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if(token) {
        navigate(from, {replace: true});
    }
    
    const hanldeLogin = data => {
        console.log(data);
        setLoginError('')
        signInUser(data.email, data.password)
        .then(result => {
            setLoginUserEmail(data.email)
        })
        .catch(error => {
            console.log(error)
            setLoginError(error.message)
        })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(hanldeLogin)}>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">EMAIL</span></label>
                        <input {...register("email", {
                            required: 'Email is required'
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                            type="text" className=" input input-bordered w-full " />
                            {errors.email?.type === 'required' && <p className='text-red-600'>First name is required</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required: 'password is required',
                            minLength: {value: 6, message: 'password is must be 6 characters of longer'}
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                        type="password" className="input input-bordered w-full " />
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        <p className='mb-5'><Link to='' className='text-primary'>Forgot Password?</Link></p>
                        <p className='text-red-600'>{loginError}</p>
                    </div>
                    <p>{ }</p>
                    <input className="btn w-full" type="submit" />
                    <p>New TO This Website? <Link to='/signUp' className='text-primary'>Create A Account</Link></p>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider">OR</div>
                        <div className="w-full btn btn-outline">Continue With Google</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;