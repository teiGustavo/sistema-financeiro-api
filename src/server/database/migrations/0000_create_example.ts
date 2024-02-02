import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.example, table => {
            table.increments('id').primary();
            table.string('name', 150).checkLength('>', 3).checkLength('<=', 150).notNullable();
            table.text('descricao').checkLength('>', 3).nullable();
            
            table.comment('Tabela de exemplo.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.example}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.example)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.example}`);
        });
}