import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IEmpresa } from '../../models';


export const create = async (empresa: Omit<IEmpresa, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.empresas)
            .insert(empresa)
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