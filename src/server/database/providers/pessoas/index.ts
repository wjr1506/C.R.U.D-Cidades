import * as getAll from "./getAll";
import * as create from "./create";
import * as deleteById from "./deleteById";
import * as getById from "./getById";
import * as updateById from "./updateById";
import * as count from "./count";


export const PessoasProvider = {
  ...create,
  ...deleteById,
  ...getById,
  ...updateById,
  ...getAll,
  ...count
};