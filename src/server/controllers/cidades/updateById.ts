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
export const updateByIdValidation = validation((getSchema) => ({
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


export const updateById: RequestHandler = async (req: Request<IParamsProps>, res: Response) => {

  if(Number(req.params.id) === 9999) return res.status(StatusCodes.BAD_REQUEST).json({errors:{default:'registro não encontrado'}})
  res.status(StatusCodes.OK).json({id:1,nome:'aaa'})
}