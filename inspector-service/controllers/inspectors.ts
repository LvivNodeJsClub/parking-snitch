import {BadRequestError, NotFoundError} from '../errorHandler/customErrors';
import {Inspector as InspectorsModel} from '../models/inspectors';
import statusCodes from 'http-status-codes';
import {Request, Response} from "express";
import {googleapiConfigs} from '../config';
import {MAX_INSPECTOR_WALK_DURATION, MAX_INSPECTOR_WALK_DISTANCE} from '../constants'

const googleMapsAPIClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise});

export async function getInspectorById(req: Request, res: Response) {
    const inspector = await InspectorsModel.findById(req.params.id).where('deleted', false);
    if (!inspector) {
        throw new NotFoundError(`Report with ID ${req.params.id} was not found`);
    }
    res.send(inspector);
}

export async function getAllInspectors(req: Request, res: Response) {
    res.send(await InspectorsModel.find({}).where('deleted', false));
}

export async function addNewInspector(req: Request, res: Response) {
    const inspectorData = req.body;
    inspectorData.deleted = false;
    // TODO: validation should be here
    const newInspector = new InspectorsModel(inspectorData);
    await newInspector.save();
    res.status(statusCodes.CREATED).send(newInspector);
}

export async function updateInspector(req: Request, res: Response) {
    const inspectorData = req.body;
    // TODO: validation should be here
    res.send(await InspectorsModel.findOneAndUpdate({'_id': req.params.id}, inspectorData, {new: true}));
}

export async function replaceInspector(req: Request, res: Response) {
    const inspectorData = req.body;
    // TODO: validation should be here
    res.send(await InspectorsModel.replaceOne({'_id': req.params.id}, inspectorData));
}

export async function deleteInspector(req: Request, res: Response) {
    await InspectorsModel.findOneAndUpdate({'_id': req.params.id}, {deleted: true});
    res.sendStatus(statusCodes.NO_CONTENT);
}

export async function getNearest(req: Request, res: Response) {
    const inspectors = await InspectorsModel.find({}).where('deleted', false);
    if (!inspectors.length) throw new NotFoundError('No inspectors were found');
    const origins = inspectors.map(({location}) => `${location.lat}, ${location.lon}`);
    const destinations = `${req.query.lat}, ${req.query.lon}`;
    if (!destinations) throw new BadRequestError('Destination coordinates must be specified');
    const params = {
        ...googleapiConfigs,
        origins,
        destinations
    };
    const result: any = await googleMapsAPIClient.distanceMatrix(params).asPromise();

    const inspectorsByDistance = inspectors
        .map((inspector, index) => {
            const element = result.json.rows[index].elements[0];
            const distance = element.status === 'OK' ? element.distance.value : null;
            const duration = element.status === 'OK' ? element.duration.value : null;
            return {...inspector.toJSON(), distance, duration};
        })
        .filter((inspector) => inspector.distance && (inspector.duration < MAX_INSPECTOR_WALK_DURATION || inspector.distance < MAX_INSPECTOR_WALK_DISTANCE))
        .sort((a, b) => a.distance - b.distance);

    res.send(inspectorsByDistance.length ? inspectorsByDistance[0] : new NotFoundError('No nearby inspectors were found'));
}