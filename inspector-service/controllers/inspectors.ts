import {BadRequestError, NotFoundError} from '../errorHandler/customErrors';
import {Inspector as InspectorsModel, InspectorModel} from '../models/inspectors';
import statusCodes from 'http-status-codes';
import {Request, Response} from "express";
import {googleapiConfigs} from '../config';
import {MAX_INSPECTOR_WALK_DURATION, MAX_INSPECTOR_WALK_DISTANCE} from '../constants';

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
    if (!req.query.lat || !req.query.lon) throw new BadRequestError('Destination coordinates must be specified');

    let result: any;
    if (process.env.CALC_DISTANCE_WITH_GOOGLE_API === 'TRUE') {
        result = await findNearestViaGoogleAPI(inspectors, req.query);
    } else {
        result = findNearestViaMath(inspectors, req.query);
    }

    res.send(result.length ? result[0] : new NotFoundError('No nearby inspectors were found'));
}

async function findNearestViaGoogleAPI(inspectors: Array<InspectorModel>, bastard: any) {
    console.log('Finding nearest via Google Maps API');
    const origins = inspectors.map(({location}) => `${location.lat}, ${location.lon}`);
    const destinations = `${bastard.lat}, ${bastard.lon}`;
    const params = {
        ...googleapiConfigs,
        origins,
        destinations
    };
    const result: any = await googleMapsAPIClient.distanceMatrix(params).asPromise();
    return inspectors
        .map((inspector, index) => {
            const element = result.json.rows[index].elements[0];
            const distance = element.status === 'OK' ? element.distance.value : null;
            const duration = element.status === 'OK' ? element.duration.value : null;
            return {...inspector.toJSON(), distance, duration};
        })
        .filter((inspector) => inspector.distance && (inspector.duration < MAX_INSPECTOR_WALK_DURATION || inspector.distance < MAX_INSPECTOR_WALK_DISTANCE))
        .sort((a, b) => a.distance - b.distance);
}

function findNearestViaMath(inspectors: Array<InspectorModel>, bastard: any) {
    console.log('Finding nearest via math');
    return inspectors.map(inspector => {
        return {...inspector.toJSON(), distance: getDistanceFromLatLon(inspector.location.lat, inspector.location.lon, bastard.lat, bastard.lon)}
    }).sort((a, b) => a.distance - b.distance);
}

function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius: number = 6371000; // Radius of the earth in m
    const dLat: number = deg2rad(lat2 - lat1);
    const dLon: number = deg2rad(lon2 - lon1);
    const a: number =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c; // Distance in m
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
}