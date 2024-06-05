import { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import UrlDetailsDisplay from './UrlDetailsDisplay';
import style from './urlDetailsDisplay.module.scss';
import ConfirmationDialog from './ConfirmationDialog';
import { NextPreviousPage } from './NextPreviousPage';

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
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [deleteCode, setDeleteCode] = useState<string>('');

    // memoize the function to prevent unnecessary re-renders

    const getShortenedURLs = useCallback(
        async (pageIndex: number = 0) => {
            pageIndex = pageIndex < 0 ? 0 : pageIndex;
            const res = await fetch(`/api/urls?pageIndex=${pageIndex}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`,
                },
            });

            const json = await res.json();
            console.log(json);
            setData(json);
            setPageIndex(pageIndex);
        },
        [pageIndex]
    );

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
                <UrlDetailsDisplay key={url._id} urlData={url} openDialog={openDialog} />
            ))}
            <NextPreviousPage pageIndex={pageIndex} setPageIndex={getShortenedURLs} />
        </>
    );
}

export default ManageUrls;
