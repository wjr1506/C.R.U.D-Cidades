import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middleware";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamsProps {
  id?: number,
}
interface IBodyProps extends Omit<ICidade, 'id'> { }



//execute middleware validation
export const updateByIdValidation = validation((getSchema) => ({
  //object
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    }),
  ),

}));


export const updateById: RequestHandler = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {


  if (!req.params.id) {
    return res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }

  const result = await CidadesProvider.updateById(Number(req.params.id), req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } })
  }
  res.status(StatusCodes.OK).json(result)
}