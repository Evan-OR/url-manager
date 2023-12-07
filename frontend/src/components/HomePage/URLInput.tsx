import { useRef } from 'react';
import style from './urlInput.module.scss';

function URLInput() {
    const URLInputRef = useRef<HTMLInputElement>(null);

    const shortenURL = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!URLInputRef.current || URLInputRef.current.value === '') {
            console.log('NO URL INPUT!!!!!!!!');
            return;
        }
        const url = URLInputRef.current.value;
        try {
            new URL(url);
        } catch (error) {
            console.log('INVALID URL');
            return;
        }

        const res = await fetch(`/api/url/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                original_url: url,
                created_by: 'Anonymous',
            }),
        });
        const json = await res.json();

        console.log(json);
    };

    return (
        <form onSubmit={shortenURL}>
            <div className={style.inputWrapper}>
                <input
                    className={style.input}
                    ref={URLInputRef}
                    type="text"
                    placeholder="https://www.YourLongURL.com/"
                ></input>
                <button className={style.submitBtn} type="submit">
                    Shorten
                </button>
            </div>
        </form>
    );
}

export default URLInput;
