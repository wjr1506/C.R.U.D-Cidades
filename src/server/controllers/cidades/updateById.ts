import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";

interface IParamsProps {
  id?: number,
}



//execute middleware validation
export const updateByIdValidation = validation((getSchema) => ({
  //object
  query: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0),
    }),
  ),


}));


export const updateById: RequestHandler = async (req: Request<{}, {}, {}, IParamsProps>, res: Response) => {
  res.send('Cidades!')
}