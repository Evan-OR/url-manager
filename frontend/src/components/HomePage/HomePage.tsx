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
            <URLInput />

            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default HomePage;
