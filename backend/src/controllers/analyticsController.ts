import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import AnalyticsModel from '../models/analyticsModel';
import User from '../models/userModel';

const getAnalyticsByUrlID = async (req: Request, res: Response) => {
    const { url_id } = req.params;
    const user = res.locals.user as User;

    try {
        const analyticsCollection = req.app.get('analyticsCollection') as Collection<AnalyticsModel>;

        const analytics = await analyticsCollection.findOne({ url_id });

        if (!analytics) return res.status(404).json({ message: `No analytics data found` });

        if (analytics.creator_email !== user.email) {
            return res.status(401).json({ message: `Unauthorised` });
        }

        return res.status(200).json({ analytics });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Server Error` });
    }
};

export default { getAnalyticsByUrlID };
