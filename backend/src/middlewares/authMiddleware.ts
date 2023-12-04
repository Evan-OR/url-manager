import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    try {
        const decodedUserInfo = jwt.verify(token, process.env.SECRET);

        req.app.set('user', decodedUserInfo);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authenticateUser;
