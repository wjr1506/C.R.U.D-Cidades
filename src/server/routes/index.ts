import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController } from "./../controllers"; //único export em contrller/index para não gerar várias linhas de código

const router = Router();


router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);



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