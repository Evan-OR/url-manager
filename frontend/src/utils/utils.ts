export const getTimeSinceCreation = (date: Date) => {
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

export const convertDateFormat = (date: Date) => {
    // convert to DD/MM/YY
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day > 10 ? day : '0' + day}/${month > 10 ? month : '0' + month}/${year.toString().slice(2)}`;
};
