import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User';

const ALLOWED_LIMITS = new Set([10, 25, 50]);

const parsePagination = (query: Request['query']) => {
    const parsedLimit = Number(query.limit ?? 10);
    const parsedPage = Number(query.page ?? 1);

    const limit = ALLOWED_LIMITS.has(parsedLimit) ? (parsedLimit as 10 | 25 | 50) : 10;
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    return { limit, page };
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedUser = await UserService.createUser(req.body);
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const UserId = req.params.UserId;

    try {
        const user = await UserService.getUser(UserId);
        return user
            ? res.status(200).json(user)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page } = parsePagination(req.query);
        const users = await UserService.getAllUsers({ limit, page });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const UserId = req.params.UserId;

    try {
        const updatedUser = await UserService.updateUser(UserId, req.body);
        return updatedUser
            ? res.status(200).json(updatedUser)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const UserId = req.params.UserId;

    try {
        const user = await UserService.deleteUser(UserId);
        return user
            ? res.status(200).json(user)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser
};