import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IDocumento } from '../../database/models';
import { DocumentosProvider } from '../../database/providers/documentos';


interface IBodyProps extends Omit<IDocumento, 'id'> { }


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required().min(3).max(150)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await DocumentosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            } 
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};