import { Request, Response } from 'express';
import { Collection, MongoServerError } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { registrationValidation } from '../utils/utils';

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `GETTING USER BY ID: ${id}` });
};

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        const errors = registrationValidation(username, email, password);
        if (Object.keys(errors).length > 0)
            return res.status(401).json({ message: 'Invalid Registration Credentials', errors });

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usersCollection = req.app.get('usersCollection') as Collection<User>;

        const user: User = {
            username: username,
            email: email,
            password: hashedPassword,
            registration_date: new Date(),
        };

        const result = await usersCollection.insertOne(user);

        user._id = result.insertedId;

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET, {
            algorithm: 'HS512',
        });

        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof MongoServerError) {
            const err = error as MongoServerError;
            if (err.code == 11000) return res.status(403).json({ message: 'Email already registered' });
        }
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const usersCollection = req.app.get('usersCollection') as Collection<User>;
        const user = await usersCollection.findOne({ email: email });

        const validCredentials = await bcrypt.compare(password, user.password);

        if (!validCredentials || user === null) return res.status(401).json({ message: 'Invalid Login Credentials' });

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET, {
            algorithm: 'HS512',
        });
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof TypeError) return res.status(401).json({ message: 'Invalid Login Credentials' });
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default { getUserById, register, login };
