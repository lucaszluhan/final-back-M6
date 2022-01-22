import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import NotesRepository from '../../infra/repositories/notesRepository';
import DeleteNoteParams from '../model/deleteNoteParams';

export default class DeleteNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository) {}

   async run(data: DeleteNoteParams) {
      if (!data.id) {
         throw new NotFoundError('ID');
      }
      this.repository.delete(data.id);
   }
}
