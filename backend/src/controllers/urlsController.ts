import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import URLModel from '../models/urlModel';
import User from '../models/userModel';

const getUrlsByCreatorEmail = async (req: Request, res: Response) => {
    const { amountPerPage = 10, pageIndex = 0 } = req.query as { amountPerPage?: number; pageIndex?: number };
    const { email } = res.locals.user as User;
    const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

    if (!email) return res.status(403).json({ message: 'No email provided' });

    try {
        const cursor = urlsCollection
            .find({ creator_email: email })
            .sort({ date_created: -1 })
            .skip(amountPerPage * pageIndex)
            .limit(amountPerPage);
        const docs = await cursor.toArray();
        return res.status(200).json(docs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export default { getUrlsByCreatorEmail };
