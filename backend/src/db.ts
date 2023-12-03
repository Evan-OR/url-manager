import { Db, MongoClient } from 'mongodb';

const getDatabaseConnection = async (connectionString: string) => {
    const client = new MongoClient(connectionString);
    await client.connect();
    return client.db('url_management');
};

export default getDatabaseConnection;
