import { Router } from 'express';
import UsersRepository from '../../infra/repositories/usersRepository';
import ListUsersController from '../controllers/listUsersController';
import CreateUserController from '../controllers/createUserController';
import LoginUserController from '../controllers/loginUserController';
import Login from '../../domain/middlewares/loginM';
import CreateUserM from '../../domain/middlewares/createUserM';

export default class UsersRoutes {
   static initRoutes(): Router {
      let router = Router();

      // Repositories
      let userRepo = new UsersRepository();
      // Controllers
      let listUsersController = new ListUsersController(userRepo);
      let createUserController = new CreateUserController(userRepo);
      let loginUserController = new LoginUserController(userRepo);
      // Middlewares
      let createUserM = new CreateUserM();
      let loginMiddleware = new Login();
      // Routes
      router.get('/', listUsersController.execute);
      router.post('/login', loginMiddleware.validate, loginUserController.execute);
      router.post('/create', createUserM.validate, createUserController.execute);

      return router;
   }
}
