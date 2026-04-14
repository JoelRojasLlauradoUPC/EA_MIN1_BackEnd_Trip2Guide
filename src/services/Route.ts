import RouteModel, { IRoute } from '../models/Route';
import PointModel from '../models/Point';
import HistoryService from './History';

const ROUTE_FIELDS = ['name', 'description', 'city', 'country', 'distance', 'duration', 'difficulty', 'tags', 'userId'];

type PaginationLimit = 10 | 25 | 50;

type PaginationParams = {
    limit: PaginationLimit;
    page: number;
};

type PaginatedResult<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

type ListResult<T> = PaginatedResult<T> | T[];

const createRoute = async (input: IRoute) => {
    const route = new RouteModel(input);
    const savedRoute = await route.save();

    await HistoryService.recordHistory(
        'ROUTE',
        'CREATE',
        String(savedRoute._id),
        HistoryService.buildCreateChanges(savedRoute.toObject() as Record<string, unknown>, ROUTE_FIELDS)
    );

    return savedRoute;
};

const getRoute = async (routeId: string) => {
    return await RouteModel.findById(routeId).populate('points').exec();
};

const getAllRoutes = async (pagination?: PaginationParams): Promise<ListResult<IRoute>> => {
    if (!pagination) {
        return await RouteModel.find().sort({ _id: 1 }).populate('points').exec();
    }

    const { limit, page } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        RouteModel.find().sort({ _id: 1 }).skip(skip).limit(limit).populate('points').exec(),
        RouteModel.countDocuments()
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const updateRoute = async (routeId: string, input: Partial<IRoute>) => {
    const route = await RouteModel.findById(routeId).exec();

    if (!route) {
        return null;
    }

    const before = route.toObject() as Record<string, unknown>;
    const afterPreview = {
        ...before,
        ...input
    } as Record<string, unknown>;

    const changedFields = HistoryService.buildModifyChanges(before, afterPreview, ROUTE_FIELDS).map(
        (change) => change.fieldName
    );

    if (changedFields.length === 0) {
        return await RouteModel.findById(routeId).populate('points').exec();
    }

    route.set(input);
    const savedRoute = await route.save();

    await HistoryService.recordHistory(
        'ROUTE',
        'MODIFY',
        String(savedRoute._id),
        HistoryService.buildModifyChanges(before, savedRoute.toObject() as Record<string, unknown>, changedFields)
    );

    return await RouteModel.findById(routeId).populate('points').exec();
};

const deleteRoute = async (routeId: string) => {
    const route = await RouteModel.findById(routeId).exec();

    if (!route) {
        return null;
    }

    const before = route.toObject() as Record<string, unknown>;
    await PointModel.deleteMany({ routeId }).exec();
    const deletedRoute = await RouteModel.findByIdAndDelete(routeId).exec();

    if (!deletedRoute) {
        return null;
    }

    await HistoryService.recordHistory(
        'ROUTE',
        'DELETE',
        String(deletedRoute._id),
        HistoryService.buildDeleteChanges(before, ROUTE_FIELDS)
    );

    return deletedRoute;
};

export default {
    createRoute,
    getRoute,
    getAllRoutes,
    updateRoute,
    deleteRoute
};