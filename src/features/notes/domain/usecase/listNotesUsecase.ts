import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import NotesRepository from '../../infra/repositories/notesRepository';
import ListNotesParams from '../model/listNotesParams';

export default class ListNotesUsecase implements Usecase {
   constructor(private repository: NotesRepository) {}

   async run(data: ListNotesParams) {
      if (!data.id) {
         throw new NotFoundError('ID');
      }
      let notes = await this.repository.list(data.id);

      if (!notes) {
         throw new NotFoundError('Notes');
      }

      return notes;
   }
}
