import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IDocumento } from '../../models';


export const updateById = async (id: number, documento: Omit<IDocumento, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.documentos)
            .update(documento)
            .where('id', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro!');
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao atualizar o registro!');
    }

};