import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.example).count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || Number(count) > 0) return; 

    await knex(ETableNames.example).insert({
        name: 'Example',
        descricao: 'Example'
    });
};