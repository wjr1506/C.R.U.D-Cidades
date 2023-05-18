import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";

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
  body:getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    }),
  ),

}));


export const deleteById: RequestHandler = async (req: Request<{}, {}, {}, IParamsProps>, res: Response) => {
  res.send('Cidades!')
}