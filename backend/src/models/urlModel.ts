import { ObjectId } from 'mongodb';

type URLModel = {
    _id?: ObjectId;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
    title: string;
    analytics?: {
        total_clicks: number;
        referer_data: {
            [key: string]: Date;
        };
    };
};

export default URLModel;
