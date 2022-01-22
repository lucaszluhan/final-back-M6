import { NextFunction, Request, Response } from 'express';
import Middleware from '../../../../core/domain/contracts/middleware';
import { serverError } from '../../../../core/presentation/helpers/httpHandlers';
import UsersRepository from '../../infra/repositories/usersRepository';

export default class LoginM implements Middleware {
   async validate(req: Request, res: Response, next: NextFunction) {
      let { name, password } = req.body;
      let userRepo = new UsersRepository();
      let users = await userRepo.list();
      for (let user of users) {
         if (user.name == name && user.password == password) {
            return next();
         }
         return serverError(res, 'Falha de login. Usuario e senha não conferem.');
      }
   }
}
