import { Request, Response } from 'express';

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send(`GETTING USER BY ID: ${id}`);
};

const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.status(200).send(`CREATING USER ${email}, ${password}`);
};

export default { getUserById, createUser };
