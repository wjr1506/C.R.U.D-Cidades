import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type Tproperty = 'body' | 'headers' | 'params' | 'query';//tipos de chave de schema
type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T> //recebe um schema genérico e retorna um schema genérico
type TAllSchemas = Record<Tproperty, ObjectSchema<any>>//lista dos schemas com o typo não requerido
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>//recebe um schema genérico de TGetSchema e retorna uma lista de schema com o type não requerido
type Tvalidation = (getAllSchema: TGetAllSchemas) => RequestHandler; //recebe uma lista de TGetAllSchemas e retorna RequestHandler

export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas(schema =>
    schema
  );

  const errorsResult: Record<string, Record<string, string>> = {}; //String: {string,tring}

  Object.entries(schemas).forEach(([key, schema]) => {// convert schemas in array => Object.entries(schemas) and for each Array item => [body: {schema}] is aplly the validation 
    try {

      schema.validateSync(req[key as Tproperty], { abortEarly: false });

    } catch (e) { //if has error in key and schema

      const yupError = e as ValidationError;
      const validateErrors: Record<string, string> = {}

      yupError.inner.forEach((e) => { //for each error

        if (!e.path) return;
        validateErrors[e.path] = e.message
      });
      errorsResult[key] = validateErrors; //storage errors
    };
  })

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { dafault: errorsResult, } });
  }
}