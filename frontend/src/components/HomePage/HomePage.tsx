import { Link } from 'react-router-dom';
import URLInput from './URLInput';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import NavBar from '../NavBar/NavBar';

function HomePage() {
    const userContext = useContext(UserContext);

    const logout = () => {
        Cookies.remove('jwt');
        userContext?.setUser(null);
    };

    return (
        <>
            <NavBar />
            {userContext.user && (
                <>
                    <p>{JSON.stringify(userContext.user)}</p>
                </>
            )}
            <URLInput />
            <div>
                <Link to={'/auth'}>Login/Register</Link>
            </div>
            <div>
                <Link to={'/manage'}>Manage My URLs</Link>
            </div>
            <div>
                <Link to={'/analytics'}>See URL Analytics</Link>
            </div>

            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default HomePage;
