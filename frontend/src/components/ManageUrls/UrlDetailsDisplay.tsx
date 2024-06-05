import { getTimeSinceCreation, convertDateFormat } from '../../utils/utils';
import DeleteIcon from '../Icons/DeleteIcon';
import UrlDisplayTitle from './UrlDisplayTitle';
import style from './urlDetailsDisplay.module.scss';
import { useState } from 'react';
import TotalClicksGraph from '../Graphs/TotalClicksGraph';
import { URLData } from '../../utils/types';

type UrlDetailsDisplayProps = {
    urlData: URLData;
    openDialog: (e: React.MouseEvent<HTMLDivElement>, code: string) => void;
};

function UrlDetailsDisplay({ urlData, openDialog }: UrlDetailsDisplayProps) {
    const [isOpen, setIsOpen] = useState(false);

    const short_url = `${import.meta.env.VITE_URL}/${urlData.code}`;

    return (
        <details className={style.detailsWrapper}>
            <summary className={style.titleWrapper} onClick={() => setIsOpen(!isOpen)}>
                <UrlDisplayTitle urlData={urlData} />

                <div className={style.titleInfo}>
                    <div title="Clicks">{urlData.analytics?.total_clicks || 0}</div>
                    <div className={style.created}>{getTimeSinceCreation(urlData.date_created)}</div>
                    <div className={style.iconWrapper} onClick={(e) => openDialog(e, urlData.code)}>
                        <DeleteIcon styleClass={style.deleteIcon} />
                    </div>
                </div>
            </summary>

            <div className={style.details}>
                <div>
                    <b>Shortened URL:</b>{' '}
                    <a target="_blank" href={short_url}>
                        shortUrl.com/{urlData.code}
                    </a>
                </div>
                <div>
                    <b>Original URL:</b>{' '}
                    <a target="_blank" href={urlData.original_url}>
                        {urlData.original_url}
                    </a>
                </div>
                <div>
                    <b>Date Created:</b> {convertDateFormat(urlData.date_created)}
                </div>

                {isOpen && <TotalClicksGraph urlData={urlData} />}
            </div>
        </details>
    );
}

export default UrlDetailsDisplay;
