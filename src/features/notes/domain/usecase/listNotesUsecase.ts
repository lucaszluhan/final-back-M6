import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import ListNotesParams from '../model/listNotesParams';

export default class ListNotesUsecase implements Usecase {
   constructor(private repository: NotesRepository, private cacheRepo: CacheRepository) {}

   async run(data: ListNotesParams) {
      if (data.userId.length > 32) {
         throw new IdError();
      }

      let cachedNotes = await this.cacheRepo.get(`note:AllForId${data.userId}`);
      if (cachedNotes) {
         return cachedNotes;
      }

      let notes = await this.repository.list(data.userId);

      if (!notes) {
         throw new NotFoundError('Notes');
      }

      await this.cacheRepo.set(`note:AllForID${data.userId}`, notes);

      return notes;
   }
}
