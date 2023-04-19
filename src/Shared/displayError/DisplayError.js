import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {signOutUser} = useContext(AuthContext);

    return (
        <div>
            <p className='text-red-600'>somthing was rong</p>
            <p className='text-red-600'>{error.statusText || error.message}</p>
            <h4 className=' text-3xl'>Please <button onClick={signOutUser}>SignOut</button> and log back in </h4>
        </div>
    );
};

export default DisplayError;