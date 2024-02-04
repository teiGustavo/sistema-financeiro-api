import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransacao } from '../../models';


export const updateById = async (id: number, transacao: Omit<ITransacao, 'id'>): Promise<void | Error> => {
    try {
        if (!transacao.descricao) {
            transacao.descricao = 'Sem descrição!';
        }

        const result = await Knex(ETableNames.transacoes)
            .update(transacao)
            .where('id', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao atualizar o registro!');
    }

};