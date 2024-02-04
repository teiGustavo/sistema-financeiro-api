import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransacao } from '../../models';


export const create = async (transacao: Omit<ITransacao, 'id'>): Promise<number | Error> => {
    try {
        if (!transacao.descricao) {
            transacao.descricao = 'Sem descrição!';
        }

        const [result] = await Knex(ETableNames.transacoes)
            .insert(transacao)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao cadastrar o registro!');
    }

};