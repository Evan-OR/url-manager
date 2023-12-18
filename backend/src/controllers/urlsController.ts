import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import URLModel from '../models/urlModel';

const getUrlsByCreatorEmail = async (req: Request, res: Response) => {
    const { email } = req.app.get('user');
    const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

    if (!email) return res.status(403).json({ message: 'No email provided' });

    try {
        const cursor = urlsCollection.find({ creator_email: email }).sort({ date_created: -1 });
        const docs = await cursor.toArray();
        res.status(200).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export default { getUrlsByCreatorEmail };
