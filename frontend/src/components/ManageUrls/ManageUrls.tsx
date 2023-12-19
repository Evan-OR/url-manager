import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/UserContext';

function ManageUrls() {
    const userContext = useContext(UserContext);
    const [data, setData] = useState<[]>([]);

    const getShortenedURLs = async () => {
        const res = await fetch(`/api/urls`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
        });

        const json = await res.json();
        console.log(json);
        setData(json);
    };

    useEffect(() => {
        getShortenedURLs();
    }, []);

    return (
        <>
            <div>ManageUrls</div>
            {userContext.user && (
                <>
                    <h3>Logged in as {userContext.user.username}</h3>
                    <p>{JSON.stringify(userContext.user)}</p>
                </>
            )}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}

export default ManageUrls;
