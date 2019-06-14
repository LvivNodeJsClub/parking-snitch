import {BadRequestError, NotFoundError} from '../errorHandler/customErrors';
import {Inspector as InspectorsModel, IInspectorModel} from '../models/inspectors';
import statusCodes from 'http-status-codes';
import {googleapiConfigs} from '../config';
import {MAX_INSPECTOR_WALK_DURATION, MAX_INSPECTOR_WALK_DISTANCE} from '../constants';

const googleMapsAPIClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise});

import {Controller, Route, Get, Post, Patch, Put, Delete, Body, SuccessResponse, Query, BodyProp} from "tsoa";

@Route('/inspectors')
export class InspectorsController extends Controller {
    @Get('/{id}')
    public async getInspectorById(id: string): Promise<IInspectorModel | void> {
        try {
            const inspector = await InspectorsModel.findById(id).where('deleted', false);
            if (!inspector) {
                this.setStatus(statusCodes.NOT_FOUND);
            } else {
                return inspector;
            }
        } catch (error) {
            this.setStatus(statusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    public async getAllInspectors(): Promise<IInspectorModel[]> {
        return await InspectorsModel.find({}).where('deleted', false);
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async addNewInspector(@BodyProp() inspectorData: IInspectorModel): Promise<IInspectorModel> {
        const newInspector = new InspectorsModel(inspectorData);
        const saveResult = await newInspector.save();
        this.setStatus(201);
        return saveResult.toJSON();
    }

    @Patch('/{id}')
    public async updateInspector(id: string, @BodyProp() inspectorData: IInspectorModel): Promise<IInspectorModel | null> {
        // TODO: validation should be here
        return await InspectorsModel.findOneAndUpdate({'_id': id}, inspectorData, {new: true});
    }

    @Put('/{id}')
    public async replaceInspector(id: string, @BodyProp() inspectorData: IInspectorModel): Promise<IInspectorModel | null> {
        // TODO: validation should be here
        return await InspectorsModel.replaceOne({'_id': id}, inspectorData);
    }

    @Delete('/{id}')
    public async deleteInspector(id: string): Promise<void> {
        await InspectorsModel.findOneAndUpdate({'_id': id}, {deleted: true});
        this.setStatus(statusCodes.NO_CONTENT);
    }

    @Get('/nearest')
    public async getNearest(@Query() lat: number, @Query() lon: number): Promise<IInspectorModel> {
        const inspectors = await InspectorsModel.find({}).where('deleted', false);
        if (!inspectors.length) throw new NotFoundError('No inspectors were found');
        if (!lat || !lon) throw new BadRequestError('Destination coordinates must be specified');

        let result: any;
        if (process.env.CALC_DISTANCE_WITH_GOOGLE_API === 'TRUE') {
            result = await findNearestViaGoogleAPI(inspectors, {lat, lon});
        } else {
            result = findNearestViaMath(inspectors, {lat, lon});
        }

        return result.length ? result[0] : new NotFoundError('No nearby inspectors were found');
    }
}

async function findNearestViaGoogleAPI(inspectors: Array<IInspectorModel>, bastard: any) {
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
            return {...inspector, distance, duration};
        })
        .filter((inspector) => inspector.distance && (inspector.duration < MAX_INSPECTOR_WALK_DURATION || inspector.distance < MAX_INSPECTOR_WALK_DISTANCE))
        .sort((a, b) => a.distance - b.distance);
}

function findNearestViaMath(inspectors: Array<IInspectorModel>, bastard: any) {
    console.log('Finding nearest via math');
    return inspectors.map(inspector => {
        return {
            ...inspector,
            distance: getDistanceFromLatLon(inspector.location.lat, inspector.location.lon, bastard.lat, bastard.lon)
        }
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