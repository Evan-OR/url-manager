import { ObjectId } from 'mongodb';

interface AnalyticsModel {
    _id: ObjectId;
    url_data: ObjectId;
    creator_email: string;
    date_created: string;
    referer_data: {
        [key: string]: Date;
    };
    total_clicks: number;
}

export default AnalyticsModel;
