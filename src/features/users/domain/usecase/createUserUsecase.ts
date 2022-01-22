import { randomUUID } from 'crypto';
import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import UsersRepository from '../../infra/repositories/usersRepository';
import CreateUserParams from '../model/createUserParams';

export default class CreateUserUsecase implements Usecase {
   constructor(private repository: UsersRepository) {}

   async run(data: CreateUserParams) {
      if (!data.name) {
         throw new NotFoundError('Name');
      }
      if (!data.password) {
         throw new NotFoundError('Password');
      }

      this.repository.create({
         uid: randomUUID(),
         name: data.name,
         password: data.password,
      });
   }
}
