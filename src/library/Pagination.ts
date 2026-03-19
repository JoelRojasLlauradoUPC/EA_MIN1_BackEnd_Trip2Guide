import { Request } from 'express';

export type PaginationLimit = 10 | 25 | 50;

export type PaginationParams = {
    limit: PaginationLimit;
    page: number;
};

const ALLOWED_LIMITS = new Set([10, 25, 50]);

export const parsePagination = (query: Request['query']): PaginationParams => {
    const parsedLimit = Number(query.limit ?? 10);
    const parsedPage = Number(query.page ?? 1);

    const limit = ALLOWED_LIMITS.has(parsedLimit) ? (parsedLimit as PaginationLimit) : 10;
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    return { limit, page };
};
