import { Knex } from "knex";
import { ETableNames } from "../ETableName";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.usuario, table => {
    table
      .bigIncrements('id')
      .primary()
      .index();
    table
      .string('nome', 150)
      .unique()
      .notNullable()
      .checkLength('>', 3)
    table
      .string('email', 150)
      .notNullable()
      .unique()
      .checkLength('>', 6)
    table
      .bigInteger('senha')
      .notNullable()
      .checkLength('>', 6)


    table.comment('tabela para armazenar usuários')
  }).then(() => { console.log(`# Created table ${ETableNames.usuario}`) });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`# Droped table ${ETableNames.usuario}`)
  });
}

