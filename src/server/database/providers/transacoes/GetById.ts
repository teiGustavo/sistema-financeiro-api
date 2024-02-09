import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IResultTransacao {
    id: number;
    data: string;
    valor: number;
    descricao: string;
    tipo: string;
    status: string;
    documento_id: number;
    documento_tipo: string;
    empresa_pagadora_id: number;
    empresa_pagadora_nome: string;
    empresa_recebedora_id: number;
    empresa_recebedora_nome: string;
}


interface IFormattedTransacao {
    id: number;
    data: string;
    valor: number;
    descricao: string;
    tipo: string;
    status: string;
    documento: {
        id: number,
        tipo: string
    };
    empresa_pagadora: {
        id: number;
        nome: string;
    };
    empresa_recebedora: {
        id: number;
        nome: string;
    };
}


export const getById = async (id: number): Promise<IFormattedTransacao | Error> => {
    try {
        const result: IResultTransacao = await Knex(`${ETableNames.transacoes} AS T`)
            .select(
                'T.id', 
                'T.data',
                'T.valor',
                Knex.raw('DATE_FORMAT(T.data, "%Y-%m-%d") AS data'), 
                'T.descricao', 
                'T.tipo', 
                'T.status', 
                'T.documento_id', 
                'D.tipo AS documento_tipo', 
                'T.empresa_pagadora_id', 
                'EP.nome AS empresa_pagadora_nome', 
                'T.empresa_recebedora_id',
                'ER.nome AS empresa_recebedora_nome'
            )
            .join(`${ETableNames.documentos} AS D`, 'T.documento_id', 'D.id')
            .join(`${ETableNames.empresas} AS EP`, 'T.empresa_pagadora_id', 'EP.id')
            .join(`${ETableNames.empresas} AS ER`, 'T.empresa_recebedora_id', 'ER.id')
            .where('T.id', id)
            .first();

        if (result) return {
            id: result.id,
            data: result.data,
            valor: result.valor,
            descricao: result.descricao,
            tipo: result.tipo,
            status: result.status,
            documento: {
                id: result.documento_id,
                tipo: result.documento_tipo
            },
            empresa_pagadora: {
                id: result.empresa_pagadora_id,
                nome: result.empresa_pagadora_nome
            },
            empresa_recebedora: {
                id: result.empresa_recebedora_id,
                nome: result.empresa_recebedora_nome
            }
        };
         
        return new Error('Registro não encontrado!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao recuperar o registro!');
    }

};