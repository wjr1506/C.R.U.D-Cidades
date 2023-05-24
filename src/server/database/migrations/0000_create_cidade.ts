import { Knex } from "knex";
import { ETableNames } from "../ETableName";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.cidade, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).notNullable().index();

    table.comment('tabela para armazenar cidades')
  }).then(() => { console.log(`# Created table ${ETableNames.cidade}`) });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cidade).then(() => { console.log(`# Droped table ${ETableNames.cidade}`) });
}

