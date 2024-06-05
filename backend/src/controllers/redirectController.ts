import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import URLModel from '../models/urlModel';

const redirect = async (req: Request, res: Response) => {
    const { code } = req.params;
    if (!code) return res.status(400).json({ message: 'Node code passed!' });

    try {
        const referer = req.headers.referer ? new URL(req.headers.referer).hostname : 'none';
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

        const result = await urlsCollection.findOneAndUpdate(
            { code },
            {
                $inc: { 'analytics.total_clicks': 1 },
                $push: { [`analytics.referer_data.${referer}`]: new Date() },
            },
            { upsert: true, returnDocument: 'after' }
        );

        return res.redirect(301, result.original_url);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default { redirect };
