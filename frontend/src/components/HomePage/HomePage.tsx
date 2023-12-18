import { Link } from 'react-router-dom';
import URLInput from './URLInput';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

function HomePage() {
    const userContext = useContext(UserContext);
    const [data, setData] = useState<[]>([]);

    const getShortenedURLs = async () => {
        const res = await fetch(`api/urls`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
        });

        const json = await res.json();
        setData(json);
    };

    const logout = () => {
        Cookies.remove('jwt');
        userContext?.setUser(null);
    };

    return (
        <>
            <h2>HomePage</h2>
            {userContext.user && (
                <>
                    <h3>Logged in as {userContext.user.username}</h3>
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

            <button onClick={getShortenedURLs}>Get User's Shortened Urls</button>
            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default HomePage;
