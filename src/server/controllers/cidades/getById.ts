import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamsProps {
  id?: number,
}

//execute middleware validation
export const getByIdValidation = validation((getSchema) => ({
  //object
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),


}));


export const getById: RequestHandler = async (req: Request<IParamsProps>, res: Response) => {

  if (!req.params.id) {
    return res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }

  const result = await CidadesProvider.getById(Number(req.params.id))
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }

  res.status(StatusCodes.OK).json(result)
}