import PointModel, { IPoint } from '../models/Point';

const createPoint = async (input: IPoint) => {
    const point = new PointModel(input);
    return await point.save();
};

const getPoint = async (pointId: string) => {
    return await PointModel.findById(pointId).exec();
};

const getAllPoints = async () => {
    return await PointModel.find().sort({ index: 1 }).exec();
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