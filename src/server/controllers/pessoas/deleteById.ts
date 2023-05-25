import { RequestHandler, Request, Response } from "express"
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware"
import { PessoasProvider } from "../../database/providers/pessoas"

interface IParamsProps {
  id?: number
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  )
}));

export const deleteById: RequestHandler = async (req: Request<IParamsProps>, res: Response) => {

  if (!req.params.id) {
    return res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }
  const result = await PessoasProvider.deleteById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }

  res.status(StatusCodes.NO_CONTENT).send()
}