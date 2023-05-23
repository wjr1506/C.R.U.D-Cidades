import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}



//execute middleware validation
export const getAllValidation = validation((getSchema) => ({
  //object
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().moreThan(0),
      limit: yup.number().moreThan(0),
      filter: yup.string(),
    }),
  ),


}));


export const getAll: RequestHandler = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  res.status(StatusCodes.OK).json([{id:1,nome:'Araguaína'}])
}