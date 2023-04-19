import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const menuItem = <>
        <li><Link className='font-bold' to={'/'}>Home</Link></li>
        <li><Link className='font-bold' to={'/appointment'}>Appointment</Link></li>
        <li><Link className='font-bold' to={'/about'}>About</Link></li>
        <li><Link className='font-bold' to={'/contect'}>Contect Us</Link></li>
        <>
            {
                user?.uid ?
                    <>
                        <li><Link className='font-bold' to={'/dashboard'}>Dashborad</Link></li>
                        <li onClick={signOutUser}><Link className='font-bold' to={'/login'}>SignOut</Link></li>
                    </>
                    : <li><Link className='font-bold' to={'/login'}>Login</Link></li>
            }
        </>

        <li><Link className='font-bold text-green-800'>{user?.displayName}</Link></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 flex justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItem}
                    </ul>
                </div>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;