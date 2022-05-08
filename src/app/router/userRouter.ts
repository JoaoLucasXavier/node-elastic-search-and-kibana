import UserController from '../controllers/UserController';

const { Router } = require('express');

export default (app: any) => {
  const router = Router();

  router.post('/data-load', new UserController().dataLoad);

  router.get('/', new UserController().getAll);

  router.get('/:id', new UserController().findOne);

  router.get('/query/:field/:value', new UserController().findQuery);

  router.post('/', new UserController().create);

  router.put('/:id', new UserController().update);

  router.delete('/:id', new UserController().delete);

  router.delete('/', new UserController().deleteAll);

  app.use('/api/user', router);
};
