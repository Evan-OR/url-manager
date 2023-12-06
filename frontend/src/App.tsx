import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterForm from './components/RegisterForm/RegisterForm';
import Cookies from 'js-cookie';
import { User } from './utils/types';
import HomePage from './components/HomePage/HomePage';
import ManageUrls from './components/ManageUrls/ManageUrls';
import URLAnalytics from './components/URLAnalytics/URLAnalytics';
import NotFoundPage from './components/NotFoundPage/404Page';

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
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<RegisterForm setUser={setUser} />} />
            <Route path="/manage" element={<ManageUrls />} />
            <Route path="/analytics" element={<URLAnalytics />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
    // return (
    //     <>
    //         {user ? (
    //             <div>helle {user.username}</div>
    //         ) : (
    //             <>
    //                 <button onClick={getData}>Get Data</button>
    //                 {data && <div>{JSON.stringify(data)}</div>}

    //                 <RegisterForm setUser={setUser} />
    //             </>
    //         )}
    //     </>
    // );
}

export default App;
