import DeleteIcon from '../Icons/DeleteIcon';
// import EditIcon from '../Icons/EditIcon';
import style from './urlDetailsDisplay.module.scss';

type ShortenedUrl = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
};
type UrlDetailsDisplayProps = {
    url: ShortenedUrl;
};

function UrlDetailsDisplay({ url }: UrlDetailsDisplayProps) {
    const getTimeSinceCreation = (date: Date) => {
        date = new Date(date);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor(diff / 1000);
        if (days > 0) {
            return days > 1 ? `${days} days ago` : `${days} day ago`;
        } else if (hours > 0) {
            return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
        } else if (minutes > 0) {
            return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
        } else {
            return seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`;
        }
    };

    const convertDateFormat = (date: Date) => {
        // convert to DD/MM/YY
        date = new Date(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day > 10 ? day : '0' + day}/${month > 10 ? month : '0' + month}/${year.toString().slice(2)}`;
    };

    const short_url = `${import.meta.env.VITE_URL}?code=${url.code}`;

    return (
        <details className={style.detailsWrapper}>
            <summary className={style.titleWrapper}>
                <div className={style.title}>
                    {url.title ? url.title : `Link for ${new URL(url.original_url).hostname}`}
                </div>

                <div className={style.titleInfo}>
                    <div title="Clicks">{Math.round(Math.random() * 50)}K</div>
                    <div className={style.created}>{getTimeSinceCreation(url.date_created)}</div>
                    {/* <EditIcon styleClass={style.icon} /> */}
                    <DeleteIcon styleClass={style.deleteIcon} />
                </div>
            </summary>

            <div className={style.details}>
                <div>
                    <b>Shortened URL:</b>{' '}
                    <a target="_blank" href={short_url}>
                        {short_url}
                    </a>
                </div>
                <div>
                    <b>Original URL:</b>{' '}
                    <a target="_blank" href={url.original_url}>
                        {url.original_url}
                    </a>
                </div>
                <div>
                    <b>Date Created:</b> {convertDateFormat(url.date_created)}
                </div>
            </div>
        </details>
    );
}

export default UrlDetailsDisplay;
