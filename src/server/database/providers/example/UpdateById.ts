import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IExample } from '../../models';


export const updateById = async (id: number, fornecedor: Omit<IExample, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.example)
            .update(fornecedor)
            .where('id', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao atualizar o registro!');
    }

};