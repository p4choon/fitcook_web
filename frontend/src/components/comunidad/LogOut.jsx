import { auth } from '../../firebase';
import { FiLogOut } from "react-icons/fi";

const LogOut = () => {
    const signOut = () => {
        signOut(auth);
    }
    
    return ( 
        <>
            <button 
                onClick={() => auth.signOut()}
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
