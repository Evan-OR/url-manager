import { Db, MongoClient } from 'mongodb';

const getDatabaseConnection = async (connectionString: string) => {
    const client = new MongoClient(connectionString);
    await client.connect();
    return {
        usersCollection: client.db('url_management').collection('users'),
        urlsCollection: client.db('url_management').collection('shortened_urls'),
        analyticsCollection: client.db('url_management').collection('analytics'),
    };
};

export default getDatabaseConnection;
