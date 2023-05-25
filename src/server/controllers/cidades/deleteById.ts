import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamsProps {
  id?: number,
}

interface IBodyProps {
  nome?: string,
}

//execute middleware validation
export const deleteByIdValidation = validation((getSchema) => ({
  //object
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  // body:getSchema<IBodyProps>(
  //   yup.object().shape({
  //     nome: yup.string().required().min(3),
  //   }),
  // ),

}));


export const deleteById: RequestHandler = async (req: Request<IParamsProps>, res: Response) => {

  if (!req.params.id) {
    return res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }


  const result = await CidadesProvider.deleteById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }

  res.status(StatusCodes.NO_CONTENT).send()
}