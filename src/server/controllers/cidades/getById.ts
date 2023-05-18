import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";

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
  console.log(req.params)
  res.send('Cidades!')
}