import RouteModel, { IRoute } from '../models/Route';
import PointModel from '../models/Point';

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

const createRoute = async (input: IRoute) => {
    const route = new RouteModel(input);
    return await route.save();
};

const getRoute = async (routeId: string) => {
    return await RouteModel.findById(routeId).populate('points').exec();
};

const getAllRoutes = async ({ limit, page }: PaginationParams): Promise<PaginatedResult<IRoute>> => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        RouteModel.find().skip(skip).limit(limit).populate('points').exec(),
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
    return await RouteModel.findByIdAndUpdate(routeId, input, { new: true })
        .populate('points')
        .exec();
};

const deleteRoute = async (routeId: string) => {
    await PointModel.deleteMany({ routeId }).exec();
    return await RouteModel.findByIdAndDelete(routeId).exec();
};

export default {
    createRoute,
    getRoute,
    getAllRoutes,
    updateRoute,
    deleteRoute
};