import { RequestHandler, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";



interface IBodyProps extends Omit<IUsuario, 'id'> { }


export const singUpValidation = validation((getSchema) => ({

  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      nome: yup.string().required().min(3).max(150).required(),
      senha: yup.string().required().min(6)

    }),
  )
}))

export const singUp: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }

  res.status(StatusCodes.CREATED).json(result);
}