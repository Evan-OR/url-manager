import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import URLModel from '../models/urlModel';
import AnalyticsModel from '../models/analyticsModel';

const redirect = async (req: Request, res: Response) => {
    const { code } = req.params;
    if (!code) return res.status(400).json({ message: 'Node code passed!' });

    const referer = req.headers.referer;

    try {
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;
        const analyticsCollection = req.app.get('analyticsCollection') as Collection<AnalyticsModel>;

        const result = await urlsCollection.findOne({ code });
        console.log(result.original_url);
        analyticsCollection.updateOne(
            { url_data: new ObjectId(result._id) },
            {
                $push: { [`referer_data.${referer}`]: new Date() },
                $inc: { total_clicks: 1 },
                $set: { creator_email: result['creator_email'] },
                $setOnInsert: { date_create: new Date() },
            },
            { upsert: true }
        );
        return res.redirect(301, result.original_url);
    } catch (e) {}
};

export default { redirect };
