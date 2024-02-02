import { Router } from 'express';

import { EmpresasController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';


const EmpresasRouter = Router();


EmpresasRouter.use(ensureAuthenticated);

EmpresasRouter
    .route('/empresas')
    .get(EmpresasController.getAllValidation, EmpresasController.getAll)
    .post(EmpresasController.createValidation, EmpresasController.create);

EmpresasRouter
    .route('/empresas/:id')  
    .get(EmpresasController.getByIdValidation, EmpresasController.getById)
    .put(EmpresasController.updateByIdValidation, EmpresasController.updateById)
    .delete(EmpresasController.deleteByIdValidation, EmpresasController.deleteById);


export { EmpresasRouter };