import {NotFoundError} from '../errorHandler/customErrors';
import InspectorsModel from '../models/inspectors';
import statusCodes from 'http-status-codes';
import {Request, Response} from "express";

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

export async function deleteInspector(req: Request, res: Response) {
    await InspectorsModel.findOneAndUpdate({'_id': req.params.id}, {deleted: true});
    res.sendStatus(statusCodes.NO_CONTENT);
}