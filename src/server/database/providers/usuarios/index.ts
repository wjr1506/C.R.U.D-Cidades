// import * as getAll from "./getAll";
import * as create from "./create";
// import * as deleteById from "./deleteById";
// import * as getById from "./getById";
import * as getByEmail from "./getByEmail";
// import * as updateById from "./updateById";
// import * as count from "./count";


export const UsuariosProvider = {
  ...create,
  // ...deleteById,
  ...getByEmail,
  // ...updateById,
  // ...getAll,
  // ...count
};