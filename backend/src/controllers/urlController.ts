import { Request, Response } from 'express';
import { alphaNumSample } from '../utils/codeGen';
import { Collection } from 'mongodb';
import URLModel from '../models/urlModel';

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
    const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;

    try {
        new URL(original_url); // Validate URL

        const res1 = await urlsCollection.findOne({ original_url: original_url });
        if (res1) return res.status(403).json({ message: 'URL Already shortened', shortened_url: res1 });

        const code = await generateShortCode(urlsCollection);
        const doc: URLModel = {
            code,
            original_url: original_url,
            creator_email: created_by,
            date_created: new Date(),
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

export default { shortenURL, getUrlByCode };
