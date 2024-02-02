import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IDocumento } from '../../models';


export const getById = async (id: number): Promise<IDocumento | Error> => {
    try {
        const result = await Knex(ETableNames.documentos)
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