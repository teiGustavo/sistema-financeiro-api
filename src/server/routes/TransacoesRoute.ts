import { Router } from 'express';

import { TransacoesController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';


const TransacoesRouter = Router();


TransacoesRouter.use(ensureAuthenticated);

TransacoesRouter
    .route('/transacoes')
    .get(TransacoesController.getAllValidation, TransacoesController.getAll)
    .post(TransacoesController.createValidation, TransacoesController.create);

TransacoesRouter
    .route('/transacoes/datas')
    .get(TransacoesController.getDatesValidation, TransacoesController.getDates);


TransacoesRouter
    .route('/transacoes/:id')  
    .get(TransacoesController.getByIdValidation, TransacoesController.getById)
    .put(TransacoesController.updateByIdValidation, TransacoesController.updateById)
    .delete(TransacoesController.deleteByIdValidation, TransacoesController.deleteById);


export { TransacoesRouter };