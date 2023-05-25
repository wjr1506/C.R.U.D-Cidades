import { RequestHandler, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto, jwtService } from "../../shared/services";



interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }


export const singInValidation = validation((getSchema) => ({

  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      senha: yup.string().required()

    }),
  )
}))

export const singIn: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body


  const result = await UsuariosProvider.getByEmail(email);


  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  }

  const senhaResult = await PasswordCrypto.verifyPassword(senha, result.senha);

  if (senhaResult !== true) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });

  } else {

    const acessToken = jwtService.sing({ uid: result.id });
    console.log(acessToken)
    if (acessToken === 'JWT_SECRET NOT FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      })
    }

    return res.status(StatusCodes.OK).json({ acessToken })
  }

  res.status(StatusCodes.CREATED).json(result);
}