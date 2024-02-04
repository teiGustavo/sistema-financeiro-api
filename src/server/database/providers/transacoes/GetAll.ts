import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IFormattedTransacao {
    id: number;
    data?: string;
    valor?: number;
    descricao?: string;
    tipo?: string;
    situacao?: string;
    documento_id: number;
    empresa_pagadora_id: number;
    empresa_recebedora_id: number;
}


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IFormattedTransacao[] | Error> => {
    try {
        const result = await Knex(ETableNames.transacoes)
            .select(
                'id', 
                Knex.raw('DATE_FORMAT(data, "%d/%m/%Y") as data'), 
                Knex.raw('CONCAT("R$ ", REPLACE(REPLACE(REPLACE(FORMAT(valor, 2), ".", "|"), ",", "."), "|", ",")) as valor'), 
                'descricao', 
                'tipo', 
                'situacao', 
                'documento_id', 
                'empresa_pagadora_id', 
                'empresa_recebedora_id'
            )
            .where('id', Number(id))
            .orWhere('data', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = await Knex(ETableNames.transacoes)
                .select(
                    'id', 
                    Knex.raw('DATE_FORMAT(data, "%d/%m/%Y") as data'), 
                    Knex.raw('CONCAT("R$ ", REPLACE(REPLACE(REPLACE(FORMAT(valor, 2), ".", "|"), ",", "."), "|", ",")) as valor'), 
                    'descricao', 
                    'tipo', 
                    'situacao', 
                    'documento_id', 
                    'empresa_pagadora_id', 
                    'empresa_recebedora_id'
                )
                .where('id', id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao consultar os registros!');
    }

};