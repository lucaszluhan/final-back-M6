import { randomUUID } from 'crypto';
import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import NotesRepository from '../../infra/repositories/notesRepository';
import CreateNotesParams from '../model/createNoteParams';

export default class CreateNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository) {}

   async run(params: CreateNotesParams) {
      if (!params.detail) {
         throw new NotFoundError('Detail');
      }
      if (!params.description) {
         throw new NotFoundError('Description');
      }
      if (!params.id) {
         throw new NotFoundError('ID');
      }

      this.repository.create({
         uid: randomUUID(),
         description: params.description as string,
         detail: params.detail as string,
         user_uid: params.id as string,
      });
   }
}
