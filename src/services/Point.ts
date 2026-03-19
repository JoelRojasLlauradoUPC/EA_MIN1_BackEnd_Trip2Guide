import PointModel, { IPoint } from '../models/Point';
import { PaginationParams } from '../library/Pagination';

type PaginatedResult<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

const createPoint = async (input: IPoint) => {
    const point = new PointModel(input);
    return await point.save();
};

const getPoint = async (pointId: string) => {
    return await PointModel.findById(pointId).exec();
};

const getAllPoints = async ({ limit, page }: PaginationParams): Promise<PaginatedResult<IPoint>> => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        PointModel.find().sort({ index: 1 }).skip(skip).limit(limit).exec(),
        PointModel.countDocuments()
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

const getPointsByRoute = async (routeId: string) => {
    return await PointModel.find({ routeId }).sort({ index: 1 }).exec();
};

const updatePoint = async (pointId: string, input: Partial<IPoint>) => {
    return await PointModel.findByIdAndUpdate(pointId, input, { new: true }).exec();
};

const deletePoint = async (pointId: string) => {
    return await PointModel.findByIdAndDelete(pointId).exec();
};

export default {
    createPoint,
    getPoint,
    getAllPoints,
    getPointsByRoute,
    updatePoint,
    deletePoint
};