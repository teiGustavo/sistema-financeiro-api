import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { ITransacao } from '../../database/models';
import { TransacoesProvider } from '../../database/providers/transacoes';


interface IBodyProps extends Omit<ITransacao, 'id'> { }


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        data: yup.string().required().min(10, 'Deve seguir o formato \'yyyy-mm-dd\'').max(10, 'Deve seguir o formato \'yyyy-mm-dd\''),
        valor: yup.number().required(),
        descricao: yup.string().min(3).optional().default('Sem descrição!'),
        tipo: yup.string().min(3).max(7).optional().default('Saída'),
        status: yup.string().min(3).max(9).optional().default('Pendente'),
        documento_id: yup.number().integer().positive().required(),
        empresa_pagadora_id: yup.number().integer().positive().required(),
        empresa_recebedora_id: yup.number().integer().positive().required(),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await TransacoesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            } 
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};