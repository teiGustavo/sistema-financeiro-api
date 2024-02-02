import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.transacoes).count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || Number(count) > 0) return; 

    await knex(ETableNames.transacoes).insert({
        data: '2024-01-02',
        valor: 1000.90,
        descricao: 'Transferência de Fluxo de Caixa',
        documento_id: 1,
        empresa_pagadora_id: 1,
        empresa_recebedora_id: 2,
    });
};