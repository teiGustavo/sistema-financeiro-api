import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.transacoes, table => {
            table.increments('id').primary();
            table.date('data').notNullable();
            table.decimal('valor', 10, 2).notNullable();
            table.text('descricao').checkLength('>', 3).nullable();
            table.string('tipo', 7).checkLength('>=', 5).checkLength('<=', 7).notNullable().defaultTo('Saída').comment('Expected: Entrada or Saída'); 
            table.string('status', 8).checkLength('>=', 4).checkLength('<=', 9).notNullable().defaultTo('Pendente').comment('Expected: Pago ,Pendente or Cancelado');    
            
            table.integer('documento_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(ETableNames.documentos)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.integer('empresa_pagadora_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(ETableNames.empresas)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.integer('empresa_recebedora_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(ETableNames.empresas)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
            
            table.comment('Tabela de transações.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.transacoes}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.transacoes)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.transacoes}`);
        });
}