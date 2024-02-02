import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.documentos, table => {
            table.increments('id').primary();
            table.string('tipo', 150).checkLength('>', 3).checkLength('<=', 150).notNullable();
            
            table.comment('Tabela de documentos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.documentos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.documentos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.documentos}`);
        });
}