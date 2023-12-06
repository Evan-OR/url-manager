import { useEffect, useState } from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Cookies from 'js-cookie';
import { User } from './utils/types';

function App() {
    const [data, setData] = useState(null);
    const [user, setUser] = useState<User>();

    const getData = async () => {
        const res = await fetch('/api');
        const json = await res.json();
        setData(json);
    };

    useEffect(() => {
        if (Cookies.get('jwt')) {
            console.log('user Should be logged in');
        }
    }, []);

    return (
        <>
            {user ? (
                <div>helle {user.username}</div>
            ) : (
                <>
                    <button onClick={getData}>Get Data</button>
                    {data && <div>{JSON.stringify(data)}</div>}

                    <RegisterForm setUser={setUser} />
                </>
            )}
        </>
    );
}

export default App;
