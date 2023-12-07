import { ObjectId } from 'mongodb';

interface URLModel {
    _id?: ObjectId;
    code: string;
    original_url: string;
    creator_email: string;
    date_created: Date;
}

export default URLModel;
