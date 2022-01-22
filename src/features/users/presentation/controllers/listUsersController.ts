import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import ListUsersUsecase from '../../domain/usecase/listUsersUsecase';
import UsersRepository from '../../infra/repositories/usersRepository';

export default class ListUsersController implements Controller {
   constructor(private repository: UsersRepository) {}

   async execute(req: Request, res: Response) {
      try {
         let listUsecase = new ListUsersUsecase(this.repository);
         const result = await listUsecase.run();

         return ok(res, 'Usuarios listados.', result);
      } catch (error) {
         return serverError(res, 'Falha ao listar usuarios', error);
      }
   }
}
