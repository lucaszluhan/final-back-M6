import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import NotesRepository from '../../infra/repositories/notesRepository';
import UpdateNoteParams from '../model/updateNoteParams';

export default class UpdateNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository) {}

   async run(data: UpdateNoteParams) {
      if (!data.id) {
         throw new NotFoundError('ID');
      }
      if (!data.detail) {
         throw new NotFoundError('Detail');
      }
      if (!data.description) {
         throw new NotFoundError('Description');
      }

      this.repository.update(data.id, data.detail, data.description);
   }
}
