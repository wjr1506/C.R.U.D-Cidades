import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController, PessoasController, UsuariosController } from "./../controllers"; //único export em contrller/index para não gerar várias linhas de código

const router = Router();


router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/entrar', UsuariosController.singInValidation, UsuariosController.singIn);
router.post('/cadastrar', UsuariosController.singUpValidation, UsuariosController.singUp);


router.get('/', (req, res) => {
  return res.send('hello world');
});

router.post('/:paramsTeste', (req, res) => {
  console.log(req.body);
  console.log(req.params.paramsTeste);
  console.log(req.query); //url?teste=testado
  console.log(req.cookies); //??

  return res.status(StatusCodes.ACCEPTED).json({ 'StatusCode': 200 });
  // return res.json({'StatusCode':200});
});


export { router };