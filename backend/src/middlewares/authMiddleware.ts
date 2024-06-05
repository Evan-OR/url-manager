import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenParts = authHeader.split(' ');

        const decodedUserInfo = jwt.verify(tokenParts[1], process.env.SECRET);
        res.locals.user = decodedUserInfo;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authenticateUser;
