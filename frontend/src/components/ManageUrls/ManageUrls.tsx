import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import UrlDetailsDisplay from './UrlDetailsDisplay';
import style from './urlDetailsDisplay.module.scss';
import ConfirmationDialog from './ConfirmationDialog';

type ShortenedUrl = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
};

function ManageUrls() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [data, setData] = useState<ShortenedUrl[]>([]);
    const [deleteCode, setDeleteCode] = useState<string>('');

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

    const openDialog = (e: React.MouseEvent<HTMLDivElement>, code: string) => {
        e.preventDefault();

        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
        setDeleteCode(code);
    };

    const deleteLink = async (e: React.MouseEvent<HTMLButtonElement>): Promise<boolean> => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/url/${deleteCode}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`,
                },
            });
            const json = await res.json();
            if (!res.ok) {
                console.log(json.message);
                return false;
            }

            const updatedData = data.filter((url) => url.code !== deleteCode);
            setData(updatedData);
            return true;
        } catch (err) {
            return false;
        }
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
            <ConfirmationDialog dialogRef={dialogRef} deleteLink={deleteLink} />
            {data.map((url) => (
                <UrlDetailsDisplay key={url._id} linkData={url} openDialog={openDialog} />
            ))}
        </>
    );
}

export default ManageUrls;
