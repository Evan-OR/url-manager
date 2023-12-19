import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterForm from './components/RegisterForm/RegisterForm';
import Cookies from 'js-cookie';
import HomePage from './components/HomePage/HomePage';
import ManageUrls from './components/ManageUrls/ManageUrls';
import URLAnalytics from './components/URLAnalytics/URLAnalytics';
import NotFoundPage from './components/NotFoundPage/404Page';
import { UserContext } from './context/UserContext';

function App() {
    const userContext = useContext(UserContext);

    const autoLogin = async (token: string) => {
        try {
            const res = await fetch('api/user/login/auto', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            userContext.setUser({ id: json.user.id, username: json.user.username, email: json.user.email });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token && userContext.user === null) {
            autoLogin(token);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<RegisterForm />} />
            <Route path="/manage" element={<ManageUrls />} />
            <Route path="/analytics" element={<URLAnalytics />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
