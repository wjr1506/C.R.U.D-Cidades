import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController, PessoasController, UsuariosController } from "./../controllers"; //único export em contrller/index para não gerar várias linhas de código
import { ensureAuth } from "../shared/middleware/ensureAuthenticated";


const router = Router();


router.get('/cidades', ensureAuth, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuth, CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', ensureAuth, CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', ensureAuth, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuth, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', ensureAuth, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', ensureAuth, PessoasController.getByIdValidation, PessoasController.getById);
router.post('/pessoas', ensureAuth, PessoasController.createValidation, PessoasController.create);
router.put('/pessoas/:id', ensureAuth, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuth, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/entrar', UsuariosController.singInValidation, UsuariosController.singIn);
router.post('/cadastrar', UsuariosController.singUpValidation, UsuariosController.singUp);


router.get('/', (req, res) => {
  return res.send('hello world');
});

router.post('/:paramsTeste', (req, res) => {

  return res.status(StatusCodes.ACCEPTED).json({ 'StatusCode': 200 });
  // return res.json({'StatusCode':200});
});


export { router };