import { RefererData } from '@frontend/src/utils/types';

export const getAllClicks = (data: RefererData): any[] => {
    const clicks = [];
    for (const key in data) {
        const formattedData: string[] = data[key].map((date) => new Date(date).toLocaleDateString());
        clicks.push(...formattedData);
    }

    return clicks;
};

export const getClickCountOverTime = (data: RefererData): { [key: string]: number } => {
    const clicks = getAllClicks(data);
    const clickCount = clicks.reduce((acc, date) => {
        if (!acc[date]) {
            acc[date] = 1;
        } else {
            acc[date]++;
        }
        return acc;
    }, {} as { [key: string]: number });

    return clickCount;
};

export const flattenData = (data: RefererData): number[] => {
    const flattenedData: number[] = [];
    for (const key in data) {
        flattenedData.push(...data[key]);
    }

    return flattenedData;
};

export const getTotalClicksOverTime = (data: RefererData): { [key: string]: number } => {
    const flattenedData = flattenData(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    let total = 0;
    const clickCount = flattenedData.reduce((acc, date) => {
        total++;
        acc[formatTimestamp(date)] = total;
        return acc;
    }, {} as { [key: string]: number });
    return clickCount;
};

const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
