import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import UpdateNoteUsecase from '../../domain/usecase/updateNoteUsecase';
import NotesRepository from '../../infra/repositories/notesRepository';

export default class UpdateNoteController implements Controller {
   constructor(private repository: NotesRepository) {}

   async execute(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const { detail, description } = req.body;
         if (!id) {
            return badRequest(res, 'Sem valor de ID.');
         }
         if (!detail) {
            return badRequest(res, 'Sem valor de detail.');
         }
         if (!description) {
            return badRequest(res, 'Sem valor de description.');
         }

         const updateUsecase = new UpdateNoteUsecase(this.repository);

         updateUsecase.run({ detail: detail, description: description, id: id });

         return ok(res, 'Nota alterada com sucesso.');
      } catch (error) {
         return serverError(res, 'Falha ao editar nota.', error);
      }
   }
}
