import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps {
  id?: number
}
interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema(yup.object().shape({
    email: yup.string().required().email(),
    nome: yup.string().required().min(3).max(150).required(),
    cidadeId: yup.number().integer().nonNullable().required().min(1),
  }))

}))

export const updateById: RequestHandler = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

  if (!req.params.id) {
    return res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }
  const result = await PessoasProvider.updateById(Number(req.params.id), req.body);
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }
  res.status(StatusCodes.OK).json(result)

}