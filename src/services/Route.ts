import RouteModel, { IRoute } from '../models/Route';

const createRoute = async (input: IRoute) => {
    const route = new RouteModel(input);
    return await route.save();
};

const getRoute = async (routeId: string) => {
    return await RouteModel.findById(routeId).populate('points').exec();
};

const getAllRoutes = async () => {
    return await RouteModel.find().populate('points').exec();
};

const updateRoute = async (routeId: string, input: Partial<IRoute>) => {
    return await RouteModel.findByIdAndUpdate(routeId, input, { new: true })
        .populate('points')
        .exec();
};

const deleteRoute = async (routeId: string) => {
    return await RouteModel.findByIdAndDelete(routeId).exec();
};

export default {
    createRoute,
    getRoute,
    getAllRoutes,
    updateRoute,
    deleteRoute
};