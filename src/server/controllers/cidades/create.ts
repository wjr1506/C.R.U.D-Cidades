import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface ICidade {
  nome: string;
}

interface Ifilter{
  filter?: string
}

const cidadeValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});


const filterValidation: yup.Schema<Ifilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

//validation to body request
export const createCidadeValidation:RequestHandler = async (req,res,next) =>{
  // let validateData: ICidade | undefined = undefined;
  try {
    await cidadeValidation.validate(req.body, { abortEarly: false });
    // validateData = await cidadeValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (e) {

    const yupError = e as yup.ValidationError;
    const validateErrors: Record<string, string> = {

    }

    yupError.inner.forEach((e) => {

      if (!e.path) return;
      validateErrors[e.path] = e.message
    })

    return res.status(StatusCodes.BAD_REQUEST).json({ erros: { dafault: validateErrors, } });
  };

}

//validation to query params
export const createFilterValidation:RequestHandler = async (req,res,next) =>{

  try {
    await filterValidation.validate(req.query, { abortEarly: false });
    return next();
  } catch (e) {

    const yupError = e as yup.ValidationError;
    const validateErrors: Record<string, string> = {

    }

    yupError.inner.forEach((e) => {

      if (!e.path) return;
      validateErrors[e.path] = e.message
    })

    return res.status(StatusCodes.BAD_REQUEST).json({ erros: { dafault: validateErrors, } });
  };

}

export const create:RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {
}