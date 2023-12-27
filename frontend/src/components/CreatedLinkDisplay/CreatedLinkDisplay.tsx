import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import style from './createdLinkDisplay.module.scss';
import CopyIcon from '../Icons/CopyIcon';

type ShortenedUrl = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
};

function CreatedLinkDisplay() {
    const { urlCode } = useParams<{ urlCode: string }>();
    const [urlData, setUrlData] = useState<ShortenedUrl | null>(null);
    const [styling, setStyling] = useState<string>('');

    const getUrlData = async () => {
        const res = await fetch(`/api/url/${urlCode}`, {
            method: 'GET',
        });
        const json = await res.json();

        setUrlData(json.url);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_URL}?code=${urlCode}`);
    };

    const addAnimation = () => {
        setStyling(style.addAnimation);
    };

    useEffect(() => {
        getUrlData();
    }, []);

    return (
        <>
            <NavBar />
            <div
                className={style.copyLink}
                onClick={() => {
                    copyLink();
                    addAnimation();
                }}
            >
                <div className={style.flipElement}>
                    <div className={`${style.link} ${styling}`}>shortUrl.com/{urlCode}</div>
                    <div className={`${style.clipboard} ${styling}`} onAnimationEnd={() => setStyling('')}>
                        Copied To Clipboard!
                    </div>
                </div>
                <CopyIcon styleClass={style.icon} />
            </div>
            <div className={style.originalUrl}>
                <span className={style.highlight}>Original Url:</span> {urlData?.original_url}
            </div>
        </>
    );
}

export default CreatedLinkDisplay;
