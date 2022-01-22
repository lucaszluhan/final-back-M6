import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import CreateUserUsecase from '../../domain/usecase/createUserUsecase';
import UsersRepository from '../../infra/repositories/usersRepository';

export default class CreateUserController implements Controller {
   constructor(private repository: UsersRepository) {}

   async execute(req: Request, res: Response) {
      try {
         const { name, password } = req.body;

         if (!name) {
            return badRequest(res, 'Sem valor de name.');
         }
         if (!password) {
            return badRequest(res, 'Sem valor de password.');
         }

         let createUsecase = new CreateUserUsecase(this.repository);
         createUsecase.run({ name: name, password: password });

         return ok(res, 'Usuario criado com sucesso.');
      } catch (error) {
         return serverError(res, 'Falha ao criar usuario.', error);
      }
   }
}
