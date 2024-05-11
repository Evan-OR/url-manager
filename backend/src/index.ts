import express from 'express';
import 'dotenv/config';

import userRouter from './routes/userRouter';
import urlRoutes from './routes/urlRouter';
import urlsRouter from './routes/urlsRouter';
import analyticsRouter from './routes/analyticsRouter';
import redirectRouter from './routes/redirectRouter';
import { Collection, Db } from 'mongodb';
import getDatabaseConnection from './db';
import URLModel from './models/urlModel';

(async () => {
    try {
        const app = express();
        const port = process.env.PORT;

        app.use(express.json());

        app.use('/api/url', urlRoutes);
        app.use('/api/urls', urlsRouter);
        app.use('/api/user', userRouter);
        app.use('/api/redirect', redirectRouter);

        app.use('/api/analytics', analyticsRouter);

        const { usersCollection, urlsCollection, analyticsCollection } = await getDatabaseConnection(
            process.env.MONGODB
        );
        app.set('usersCollection', usersCollection);
        app.set('urlsCollection', urlsCollection);
        app.set('analyticsCollection', analyticsCollection);

        app.get('/api', async (req, res) => {
            const urlsCollection = req.app.get('urlsCollection') as Collection<URLModel>;
            const result = await urlsCollection.findOne();
            res.status(200).json(result);
        });

        app.listen(port, () => {
            console.log(`Example app listening on http://localhost/${port}`);
        });
    } catch (error) {
        console.log(error);
        console.log('server brokey');
    }
})();
