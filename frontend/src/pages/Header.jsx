import { signOut } from 'firebase/auth';
import React from 'react';
import { HiSun } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { auth } from '../dist/firebase';

const Header = ({ userId }) => {
    console.log(userId);
    const logout = () => {
        if (userId) {
            signOut(auth)
                .then(() => {
                    localStorage.clear();
                })
        }
        window.location.reload();
    }

    return (
        <div style={{ height: '5vh' }} className="bg-black text-white flex items-center justify-between transition duration-500 ease-in-out py-2" >
            <HiSun
                className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
            />
            <h1>HOSPITON</h1>
            {userId && (
                <Link to="/login"><button onClick={() => logout()} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded'>Logout</button></Link>
            )}
            {!userId && (
                <Link to="/home"><button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded'>Home</button></Link>
            )}
        </div>
    )
}

export default Header;