import Joi from 'joi';
import {BadRequestError} from '../errorHandler/customErrors'

const defaultScheme = {
    description: Joi.string().allow(null),
    location: Joi.object().keys({
        lat: Joi.number().min(-90).max(90).required(),
        lon: Joi.number().min(-180).max(180).required(),
    }),
};

export function validateUpdateReport(body: object) {
    const schema = Joi.object().keys({
        ...defaultScheme,
    }).or('description', 'location');

    const result = Joi.validate(body, schema, {stripUnknown: true});

    if (result.error) {
        throw new BadRequestError(result.error.details[0].message);
    }
    return result.value;
}

export function validateCreateNewReport(body: object) {
    const schema = Joi.object().keys({
        ...defaultScheme,
    }).requiredKeys("location");

    const result = Joi.validate(body, schema, {stripUnknown: true});

    if (result.error) {
        throw new BadRequestError(result.error.details[0].message);
    }
    return result.value;
}
