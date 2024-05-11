export type User = {
    id: string;
    username: string;
    email: string;
};

export type Analytics = {
    _id: string;
    url_data: string;
    creator_email: string;
    date_created: string;
    referer_data: {
        [key: string]: Date;
    };
    total_clicks: number;
};
