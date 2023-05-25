import { ETableNames } from "../../ETableName";
import { Knex } from "../../knex";
import { ICidade, IPessoa } from "../../models";

export const getById = async (id: number): Promise<IPessoa | Error> => {

  try {
    const result = await Knex(ETableNames.pessoa).select('*').where('id', '=', id).first();
    if (result != undefined) return result;

    return new Error('Erro ao buscar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao buscar o registro');
  }
}