import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CreatedLinkDisplay() {
    const { urlCode } = useParams<{ urlCode: string }>();

    const getUrlData = async () => {
        const res = await fetch(`/api/url/${urlCode}`, {
            method: 'GET',
        });
        const json = await res.json();

        console.log(json);
    };

    useEffect(() => {
        getUrlData();
    }, []);

    return (
        <>
            <div>CreatedLinkDisplay {urlCode}</div>
            <button onClick={getUrlData}>CLICK</button>
        </>
    );
}

export default CreatedLinkDisplay;
