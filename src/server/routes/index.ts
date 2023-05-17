import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController } from "./../controllers"; //único export em contrller/index para não gerar várias linhas de código

const router = Router();





// router.get('/cidades',CidadesController.getAll);
router.post('/cidades', CidadesController.createFilterValidation, CidadesController.createCidadeValidation, CidadesController.create);


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