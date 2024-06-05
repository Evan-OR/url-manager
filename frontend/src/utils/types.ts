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

export type URLData = {
    _id: string;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
    analytics?: {
        total_clicks: number;
        referer_data: RefererData;
    };
};

export type RefererData = {
    [key: string]: number[];
};
