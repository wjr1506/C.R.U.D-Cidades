import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { jwtService } from "../services";

export const ensureAuth: RequestHandler = async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    console.log(1)

    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    console.log(1)

    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  const jwtData = jwtService.verify(token)


  if (jwtData === "JWT_SECRET NOT FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro interno no servidor'
      }
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  req.headers.idUsuario = jwtData.uid.toString();


  return next();
}