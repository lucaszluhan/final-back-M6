import Usecase from '../../../../core/domain/contracts/usecase';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import DeleteNoteParams from '../model/deleteNoteParams';

export default class DeleteNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository) {}

   async run(data: DeleteNoteParams) {
      if (data.id.length > 32) {
         throw new IdError();
      }

      this.repository.delete(data.id);
   }
}
