import Joi from 'joi';

export function validateUpdateReport(body: object) {
    const schema = Joi.object().keys({
        description: Joi.string().min(1).required(),
    });

    const result = Joi.validate(body, schema, {stripUnknown: true});

    if (result.error) {
        throw new Error();
    }
    return result.value;
}

export function validateCreateNewReport(body: object) {
    const schema = Joi.object().keys({
        description: Joi.string().min(1).required(),
    });

    const result = Joi.validate(body, schema, {stripUnknown: true});

    if (result.error) {
        throw new Error();
    }
    return result.value;
}
