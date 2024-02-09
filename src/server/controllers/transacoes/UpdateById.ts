import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { ITransacao } from '../../database/models';
import { TransacoesProvider } from '../../database/providers/transacoes';


interface IParamProps {
    id?: number;
}


interface IBodyProps extends Omit<ITransacao, 'id'> { }


export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        data: yup.string().required().min(10, 'Deve seguir o formato \'yyyy-mm-dd\'').max(10, 'Deve seguir o formato \'yyyy-mm-dd\''),
        valor: yup.number().required(),
        descricao: yup.string().min(3).optional().default('Sem descrição!'),
        tipo: yup.string().min(3).max(7).optional().default('Saída'),
        status: yup.string().min(3).max(9).optional().default('Pendente'),
        documento_id: yup.number().integer().positive().required(),
        empresa_pagadora_id: yup.number().integer().positive().required(),
        empresa_recebedora_id: yup.number().integer().positive().required(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado!'
            }
        });
    }

    const result = await TransacoesProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};