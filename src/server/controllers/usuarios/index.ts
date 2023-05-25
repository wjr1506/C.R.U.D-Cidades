import * as singIn from "./singIn";
import * as singUp from "./singUp";


export const UsuariosController = {
  ...singIn,
  ...singUp,

};

//agrupar os métodos dos controllers