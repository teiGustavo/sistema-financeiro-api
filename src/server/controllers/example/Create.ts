import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IExample } from '../../database/models';
import { ExampleProvider } from '../../database/providers/example';


interface IBodyProps extends Omit<IExample, 'id'> { }


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3).max(150),
        descricao: yup.string().required().min(3),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await ExampleProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            } 
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};