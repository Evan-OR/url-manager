import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CreatedLinkDisplay() {
    const { urlCode } = useParams<{ urlCode: string }>();
    const [urlData, setUrlData] = useState(null);

    const getUrlData = async () => {
        const res = await fetch(`/api/url/${urlCode}`, {
            method: 'GET',
        });
        const json = await res.json();

        setUrlData(json);
    };

    useEffect(() => {
        getUrlData();
    }, []);

    return (
        <>
            <div>CreatedLinkDisplay {urlCode}</div>
            <div style={{ width: '100%' }}>
                <pre>{JSON.stringify(urlData, null, 4)}</pre>
            </div>
        </>
    );
}

export default CreatedLinkDisplay;
