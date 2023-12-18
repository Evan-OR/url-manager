import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    try {
        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2) return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        if (tokenParts[0] !== 'Bearer') return res.status(401).json({ message: 'Unauthorized: Invalid token' });

        const decodedUserInfo = jwt.verify(tokenParts[1], process.env.SECRET);

        req.app.set('user', decodedUserInfo);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authenticateUser;
