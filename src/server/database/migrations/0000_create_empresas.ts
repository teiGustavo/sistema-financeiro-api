import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.empresas, table => {
            table.increments('id').primary();
            table.string('nome', 150).checkLength('>', 3).checkLength('<=', 150).notNullable();
            
            table.comment('Tabela de empresas.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.empresas}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.empresas)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.empresas}`);
        });
}