import { ObjectId } from 'mongodb';

interface User {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    registration_date: Date;
}

export default User;
