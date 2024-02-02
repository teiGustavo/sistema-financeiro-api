import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransacao } from '../../models';


export const getById = async (id: number): Promise<ITransacao | Error> => {
    try {
        const result = await Knex(ETableNames.transacoes)
            .select('*')
            .where('id', id)
            .first();

        if (result) return result;
         
        return new Error('Registro não encontrado!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao recuperar o registro!');
    }

};