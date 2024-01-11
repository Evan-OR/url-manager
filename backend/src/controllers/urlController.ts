import { Request, Response } from 'express';
import { alphaNumSample } from '../utils/codeGen';
import { Collection } from 'mongodb';
import URLModel from '../models/urlModel';
import User from '../models/userModel';

const getUrlByCode = async (req: Request, res: Response) => {
    const { code } = req.params;

    try {
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

        const result = await urlsCollection.findOne({ code: code });

        if (!result) return res.status(404).json({ message: `URL not found` });

        return res.status(200).json({ url: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Server Error` });
    }
};

const shortenURL = async (req: Request, res: Response) => {
    const { original_url, created_by } = req.body;

    try {
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;
        new URL(original_url); // Validate URL

        const res1 = await urlsCollection.findOne({ original_url: original_url });
        if (res1) return res.status(403).json({ message: 'URL Already shortened', shortened_url: res1 });

        const code = await generateShortCode(urlsCollection);
        const doc: URLModel = {
            code,
            original_url: original_url,
            creator_email: created_by,
            date_created: new Date(),
            title: '',
        };
        const res2 = await urlsCollection.insertOne(doc);
        if (!res2.acknowledged) throw new Error();

        doc._id = res2.insertedId;
        res.status(200).json({
            message: `${created_by} creating shortened url for ${original_url}`,
            shortened_url: doc,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Server Error` });
    }
};

const deleteURL = async (req: Request, res: Response) => {
    const { code } = req.params;
    const user = res.locals.user as User;

    if (!user.email) return res.status(401).json({ message: `Unauthorized` });

    try {
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

        const url = await urlsCollection.findOne({ code: code });
        if (!url) return res.status(404).json({ message: `URL not found` });
        if (url.creator_email !== user.email) return res.status(401).json({ message: `Unauthorized` });

        const result = await urlsCollection.deleteOne({ code: code });

        if (result.acknowledged === false) return res.status(500).json({ message: `Error deleting URL` });

        return res.status(200).json({ message: `URL deleted` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Server Error` });
    }
};

const updateUrl = async (req: Request, res: Response) => {
    const { code } = req.params;
    const data = req.body;

    try {
        const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

        const result = await urlsCollection.updateOne(
            { code: code },
            {
                $set: {
                    ...data,
                },
            }
        );

        if (result.acknowledged === false) return res.status(500).json({ message: `Error updating URL` });
        if (!result.matchedCount) return res.status(404).json({ message: `URL code (${code}) not found` });

        return res.status(200).json({ message: `URL updated` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Server Error` });
    }
};

// Helper Functions
const generateShortCode = async (urlsCollection: Collection<URLModel>) => {
    let count = 0;
    while (true) {
        if (count === 10) throw new Error('Generate Code Attempt Limit');
        count++;

        let code = '';
        for (let i = 0; i < 6; i++) {
            code += alphaNumSample[Math.floor(Math.random() * alphaNumSample.length)];
        }

        const res = await urlsCollection.findOne({ code: code });
        if (res === null) return code;
    }
};

export default { shortenURL, getUrlByCode, deleteURL, updateUrl };
