import { NextFunction, Request, Response } from 'express';
import Middleware from '../../../../core/domain/contracts/middleware';
import { serverError } from '../../../../core/presentation/helpers/httpHandlers';
import UsersRepository from '../../infra/repositories/usersRepository';

export default class CreateUserM implements Middleware {
   async validate(req: Request, res: Response, next: NextFunction) {
      let { name } = req.body;
      let userRepo = new UsersRepository();
      let users = await userRepo.list();
      for (let user of users) {
         if (user.name == name) {
            return serverError(res, 'Usuario já existe.');
         }
      }
      return next();
   }
}
