import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import DeleteNoteUsecase from '../../domain/usecase/deleteNoteUsecase';
import NotesRepository from '../../infra/repositories/notesRepository';

export default class DeleteNoteController implements Controller {
   constructor(private repository: NotesRepository) {}

   async execute(req: Request, res: Response) {
      try {
         const id = req.params.id;
         if (!id) {
            return badRequest(res, 'Sem valor de ID.');
         }

         let deleteUsecase = new DeleteNoteUsecase(this.repository);

         deleteUsecase.run({ id: id });

         return ok(res, 'Nota deletada com sucesso.');
      } catch (error) {
         return serverError(res, 'Falha ao deletar nota.', error);
      }
   }
}
