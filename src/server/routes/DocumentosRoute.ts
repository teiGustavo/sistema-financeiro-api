import { Router } from 'express';

import { DocumentosController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';


const DocumentosRouter = Router();


DocumentosRouter.use(ensureAuthenticated);

DocumentosRouter
    .route('/documentos')
    .get(DocumentosController.getAllValidation, DocumentosController.getAll)
    .post(DocumentosController.createValidation, DocumentosController.create);

DocumentosRouter
    .route('/documentos/:id')  
    .get(DocumentosController.getByIdValidation, DocumentosController.getById)
    .put(DocumentosController.updateByIdValidation, DocumentosController.updateById)
    .delete(DocumentosController.deleteByIdValidation, DocumentosController.deleteById);


export { DocumentosRouter };