import { useContext, useRef, useState } from 'react';
import style from './urlInput.module.scss';
import { UserContext } from '../../context/UserContext';
import AlertDialog from '../UtilityComponents/AlertDialog';
import { useNavigate } from 'react-router-dom';

type ShortenURLResponse = {
    message: string;
    shortened_url: {
        original_url: string;
        code: string;
        created_by: string;
        created_at: string;
    };
};

function URLInput() {
    const navigate = useNavigate();

    const URLInputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const userContxet = useContext(UserContext);

    const [disabled, setDisabled] = useState<boolean>(false);

    const shortenURL = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!URLInputRef.current || URLInputRef.current.value === '') {
                throw new Error('Invalid URL');
            }

            const url = URLInputRef.current.value;
            new URL(url); // Throws an error if the URL is invalid

            const created_by = userContxet.user ? userContxet.user.email : 'Anonymous';

            const res = await fetch(`/api/url/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    original_url: url,
                    created_by: created_by,
                }),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message);
            }

            const data: ShortenURLResponse = await res.json();
            navigate(`/url/${data.shortened_url.code}`);
        } catch (error) {
            openDialog();
        } finally {
            setDisabled(false);
        }
    };

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    return (
        <>
            <AlertDialog dialogRef={dialogRef} />
            <form onSubmit={shortenURL}>
                <div className={style.inputWrapper}>
                    <input
                        className={style.input}
                        ref={URLInputRef}
                        type="text"
                        placeholder="https://www.YourLongURL.com/"
                        disabled={disabled}
                    ></input>
                    <button className={style.submitBtn} type="submit">
                        Shorten
                    </button>
                </div>
            </form>
        </>
    );
}

export default URLInput;
