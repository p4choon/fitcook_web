import React from 'react';
import { auth } from '../../firebase';
import { FiLogOut } from "react-icons/fi";

const LogOut = () => {
    const handleLogOut = () => {
        auth.signOut();
    };
    
    return ( 
        <>
            <button 
                onClick={handleLogOut}
                className='btn-login btn-logout'
                style={{backgroundColor:'#222222'}}
            >
                <FiLogOut size={25}/>
                Logout
            </button>
        </>
    );
}
    
export default LogOut;
