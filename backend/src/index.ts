import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

import userRouter from './routes/userRouter';
import urlRoutes from './routes/urlRoutes';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/url', urlRoutes);
app.use('/api/user', userRouter);

// const client = new MongoClient(process.env.MONGODB);
// client.connect();
// const collection = client.db('test').collection('people');

app.get('/', (req, res) => res.status(200).send('DEFAULT ROUTE'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost/${port}`);
});

console.log();
