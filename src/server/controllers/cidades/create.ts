import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";

interface ICidade {
  nome: string;
}



//execute middleware validation
export const createValidation = validation((getSchema) => ({
  //object
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    }),
  ),


}));


export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {
  res.send('Criado!')
}