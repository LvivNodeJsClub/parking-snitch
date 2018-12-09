import {NotFoundError, BadRequestError} from '../errorHandler/customErrors';
import InspectorsModel from '../models/inspectors';
import {Request, Response} from "express";

export async function getInspectorById(req: Request, res: Response) {
    const inspector = await InspectorsModel.findById(req.params.id);
    if (!inspector) {
        throw new NotFoundError(`Report with ID ${req.params.id} was not found`);
    }
    res.send(inspector);
}

export async function getAllInspectors(req: Request, res: Response) {
    res.send(await InspectorsModel.find({}));
}

export async function addNewInspector(req: Request, res: Response) {
    res.sendStatus(200);
}

export async function updateInspector(req: Request, res: Response) {
    res.sendStatus(200);
}

export async function deleteInspector(req: Request, res: Response) {
    res.sendStatus(200);
}