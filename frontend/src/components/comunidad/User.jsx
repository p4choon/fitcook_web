import SignIn from './SignIn';
import LogOut from './LogOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const User = () => {
    const [user] = useAuthState(auth);

    const photo = user ? user.photoURL : process.env.PUBLIC_URL + "/userImage.png";
    const name = user ? user.displayName : "Name User";
    return ( 
        <div className='right-side'>
            <h1>Comunidad FitCook</h1>
            <article className='card-user'>
                <img src={photo} alt="user default" />
                <p>{name}</p>
                { user ? <LogOut/> : <SignIn/> }
            </article>
        </div>
    );
}
 
export default User;
