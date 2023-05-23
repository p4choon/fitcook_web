import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Link } from "react-router-dom";

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
                { user ? <></> : <Link to="/Login"
                style={{
                    display: "inline-block",
                    backgroundColor: "#222222",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >Regístrate para hablar</Link> }
            </article>
        </div>
    );
}
 
export default User;
