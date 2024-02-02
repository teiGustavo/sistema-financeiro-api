import { Router } from 'express';

import { ExampleController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';


const ExampleRouter = Router();


ExampleRouter.use(ensureAuthenticated);

ExampleRouter
    .route('/example')
    .get(ExampleController.getAllValidation, ExampleController.getAll)
    .post(ExampleController.createValidation, ExampleController.create);

ExampleRouter
    .route('/example/:id')  
    .get(ExampleController.getByIdValidation, ExampleController.getById)
    .put(ExampleController.updateByIdValidation, ExampleController.updateById)
    .delete(ExampleController.deleteByIdValidation, ExampleController.deleteById);


export { ExampleRouter };