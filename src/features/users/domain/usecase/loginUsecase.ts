import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import UsersRepository from '../../infra/repositories/usersRepository';
import LoginParams from '../model/loginParams';

export default class LoginUsecase implements Usecase {
   constructor(private repository: UsersRepository) {}

   async run(data: LoginParams) {
      if (!data.name) {
         throw new NotFoundError('Name');
      }
      if (!data.password) {
         throw new NotFoundError('Password');
      }
      const users = await this.repository.list();
      let logUser = users.filter((user) => user.name == data.name && user.password == data.password)[0];
      let userId = { uid: logUser.uid };

      return userId;
   }
}
