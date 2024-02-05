import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IResultTransacao {
    id: number;
    data: string;
    valor: number;
    descricao: string;
    tipo: string;
    situacao: string;
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
    situacao: string;
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


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IFormattedTransacao[] | Error> => {
    try {
        const result: IResultTransacao[] = await Knex(`${ETableNames.transacoes} AS T`)
            .select(
                'T.id', 
                'T.data',
                'T.valor',
                Knex.raw('DATE_FORMAT(T.data, "%d/%m/%Y") AS data'), 
                Knex.raw('CONCAT("R$ ", REPLACE(REPLACE(REPLACE(FORMAT(T.valor, 2), ".", "|"), ",", "."), "|", ",")) AS valor'), 
                'T.descricao', 
                'T.tipo', 
                'T.situacao', 
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
            .where('T.id', Number(id))
            .orWhere('T.data', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = await Knex(`${ETableNames.transacoes} AS T`)
                .select(
                    'T.id', 
                    'T.data',
                    'T.valor',
                    Knex.raw('DATE_FORMAT(T.data, "%d/%m/%Y") AS data'), 
                    Knex.raw('CONCAT("R$ ", REPLACE(REPLACE(REPLACE(FORMAT(T.valor, 2), ".", "|"), ",", "."), "|", ",")) AS valor'), 
                    'T.descricao', 
                    'T.tipo', 
                    'T.situacao', 
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

            if (resultById) return [...result, resultById];
        }

        return result.map((transacao) => {
            return {
                id: transacao.id,
                data: transacao.data,
                valor: transacao.valor,
                descricao: transacao.descricao,
                tipo: transacao.tipo,
                situacao: transacao.situacao,
                documento: {
                    id: transacao.documento_id,
                    tipo: transacao.documento_tipo
                },
                empresa_pagadora: {
                    id: transacao.empresa_pagadora_id,
                    nome: transacao.empresa_pagadora_nome
                },
                empresa_recebedora: {
                    id: transacao.empresa_recebedora_id,
                    nome: transacao.empresa_recebedora_nome
                }
            };
        });
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao consultar os registros!');
    }

};