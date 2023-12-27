import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import UrlDetailsDisplay from './UrlDetailsDisplay';
import style from './urlDetailsDisplay.module.scss';

type ShortenedUrl = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
};

function ManageUrls() {
    const [data, setData] = useState<ShortenedUrl[]>([]);

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
            <NavBar />
            <div className={style.tableTitles}>
                <div>Name</div>
                <div className={style.detailsTitle}>
                    <div>Total Clicks</div>
                    <div>Created</div>
                </div>
            </div>
            {data.map((url) => (
                <UrlDetailsDisplay key={url._id} url={url} />
            ))}

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    );
}

export default ManageUrls;
