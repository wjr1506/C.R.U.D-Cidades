import { Knex } from "knex";
import { ETableNames } from "../ETableName";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.pessoa, table => {
    table
      .bigIncrements('id')
      .primary()
      .index();
    table
      .string('email', 150)
      .notNullable()
      .index();
    table
      .string('nome', 150)
      .unique()
      .notNullable()
      .index();
    table
      .bigInteger('cidadeId')
      .notNullable()
      .references('id')
      .inTable(ETableNames.cidade)
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
      .index();


    table.comment('tabela para armazenar pessoas')
  }).then(() => { console.log(`# Created table ${ETableNames.pessoa}`) });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# Droped table ${ETableNames.pessoa}`)
  });
}

