import { Request, Response } from 'express';

const getUrlByCode = async (req: Request, res: Response) => {
    const { code } = req.params;
    res.status(200).json({ message: `Getting url by code ${code}` });
};

const shortenURL = async (req: Request, res: Response) => {
    const { user, url } = req.body;
    res.status(200).json({ message: `${user} creating shortened url for ${url}` });
};

export default { shortenURL, getUrlByCode };
