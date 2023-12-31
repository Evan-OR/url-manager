import express from 'express';
import 'dotenv/config';

import userRouter from './routes/userRouter';
import urlRoutes from './routes/urlRouter';
import { Db } from 'mongodb';
import getDatabaseConnection from './db';
import urlsRouter from './routes/urlsRouter';

(async () => {
    try {
        const app = express();
        const port = process.env.PORT;

        app.use(express.json());

        app.use('/api/url', urlRoutes);
        app.use('/api/urls', urlsRouter);
        app.use('/api/user', userRouter);

        const { usersCollection, urlsCollection } = await getDatabaseConnection(process.env.MONGODB);
        app.set('usersCollection', usersCollection);
        app.set('urlsCollection', urlsCollection);

        app.get('/api', async (req, res) => {
            const db = app.get('db') as Db;
            const doc = await db.collection('shortened_urls').findOne({}, { projection: { _id: 0 } });
            res.status(200).json(doc);
        });

        app.listen(port, () => {
            console.log(`Example app listening on http://localhost/${port}`);
        });
    } catch (error) {
        console.log(error);
        console.log('server brokey');
    }
})();
