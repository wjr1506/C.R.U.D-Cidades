import * as create  from "./create";
import * as deleteById from "./deleteById";
import * as getAll from "./getAll";
import * as getById from "./getById";
import * as updateById from "./updateById";

export const CidadesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById
};

//agrupar os métodos dos controllers