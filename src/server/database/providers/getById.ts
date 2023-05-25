import { object } from "yup";
import { ETableNames } from "../ETableName";
import { Knex } from "../knex";
import { ICidade } from "../models";

export const getById = async (id: number): Promise<ICidade | Error> => {

  try {
    const result = await Knex(ETableNames.cidade).select('*').where('id', '=', id).first();
    if (result != undefined) return result;

    return new Error('Erro ao buscar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar o registro');
  }
}