import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import style from './urlDetailsDisplay.module.scss';
import EditIcon from '../Icons/EditIcon';
import ConfirmIcon from '../Icons/ConfirmIcon';
import CancelIcon from '../Icons/CancelIcon';
import { UserContext } from '../../context/UserContext';
import Cookies from 'js-cookie';

type ShortenedUrl = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
};

type UrlDisplayTitleProps = {
    linkData: ShortenedUrl;
};

// YO CLEAN THIS SHIT UP! HOLY FUCK!
function UrlDisplayTitle(props: UrlDisplayTitleProps) {
    const { linkData } = props;

    const userContext = useContext(UserContext);

    const [title, setTitle] = useState(
        linkData.title ? linkData.title : `Link for ${new URL(linkData.original_url).hostname}`
    );
    const [inputValue, setInputValue] = useState(title);
    const [disabled, setDisabled] = useState(true);
    const [inputWidth, setInputWidth] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
        if (e) e.preventDefault();
        if (e) e.stopPropagation();

        if (!userContext.user) {
            console.log('NOT LOGGED IN');
            return;
        }

        try {
            if (inputValue === '' || inputValue === title) {
                setDisabled(true);
                return;
            }

            setDisabled(true);

            let cleanedString = inputValue;
            cleanedString = cleanedString.replace(/\s{2,}/g, ' ');
            cleanedString = cleanedString.trim();

            const res = await fetch(`api/url/${linkData.code}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: cleanedString }),
            });

            if (res.ok) {
                setTitle(cleanedString);
                setInputValue(cleanedString);
            } else {
                throw new Error('Title Edit Failed');
            }
        } catch (err) {
            console.log(err);
        } finally {
            document.removeEventListener('mousedown', clickedOffElement);
            document.removeEventListener('keyup', handleKeyDown);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) e.preventDefault();
        setInputValue(e.target.value);
    };

    const clickedOffElement = useCallback((e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            document.removeEventListener('mousedown', clickedOffElement);
            document.removeEventListener('keyup', handleKeyDown);
            setInputValue(title);
            setDisabled(true);
        }
    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setDisabled(true);
            setInputValue(title);
        }
    };

    const handleEdit = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
        if (e) e.preventDefault();

        if (disabled) {
            inputRef.current?.focus();
            document.addEventListener('mousedown', clickedOffElement);
            document.addEventListener('keyup', handleKeyDown);
        }

        setDisabled(!disabled);
    };

    useEffect(() => {
        if (!inputRef.current) return;
        setInputWidth(
            inputRef.current.value.length + 1 > 13 ? (inputRef.current.value.length + 1) * 10 + 'px' : '120px'
        );
    }, [inputValue]);

    useEffect(() => {
        return () => {
            document.removeEventListener('mousedown', clickedOffElement);
            document.removeEventListener('keyup', handleKeyDown);
        };
    }, []);

    return (
        <form ref={formRef} className={style.titleform} onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                type="text"
                className={style.titleInput}
                value={inputValue}
                onChange={handleChange}
                size={undefined}
                style={{
                    width: inputWidth,
                }}
                disabled={disabled}
            />

            {disabled ? (
                <div className={style.iconWrapper} onClick={handleEdit}>
                    <EditIcon styleClass={style.icon} />
                </div>
            ) : (
                <div className={style.confirmCancelIcons}>
                    <div className={style.iconWrapper} onClick={handleSubmit}>
                        <ConfirmIcon styleClass={style.confirm} />
                    </div>
                    <div className={style.iconWrapper} onClick={handleEdit}>
                        <CancelIcon styleClass={style.cancel} />
                    </div>
                </div>
            )}
        </form>
    );
}

export default UrlDisplayTitle;
