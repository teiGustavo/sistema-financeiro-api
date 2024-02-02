import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.documentos).count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || Number(count) > 0) return; 

    await knex(ETableNames.documentos).insert({
        tipo: 'Saída'
    });
};