import { Request, Response, Router } from 'express';
import CreateNoteM from '../../domain/middlewares/createNoteM';
import DeleteNoteM from '../../domain/middlewares/deleteNoteM';
import ListNotesM from '../../domain/middlewares/listNotesM';
import UpdateNoteM from '../../domain/middlewares/updateNoteM';
import CreateNoteUsecase from '../../domain/usecase/createNoteUsecase';
import DeleteNoteUsecase from '../../domain/usecase/deleteNoteUsecase';
import ListNotesUsecase from '../../domain/usecase/listNotesUsecase';
import UpdateNoteUsecase from '../../domain/usecase/updateNoteUsecase';
import NotesRepository from '../../infra/repositories/notesRepository';
import CreateNoteController from '../controllers/createNoteController';
import DeleteNoteController from '../controllers/deleteNoteController';
import ListNotesController from '../controllers/listNotesController';
import UpdateNoteController from '../controllers/updateNoteController';

export default class NotesRoutes {
   static initRouter(): Router {
      let router = Router();

      let notesRepo = new NotesRepository();

      let listUsecase = new ListNotesUsecase(notesRepo);
      let createUsecase = new CreateNoteUsecase(notesRepo);
      let updateUsecase = new UpdateNoteUsecase(notesRepo);
      let deleteUsecase = new DeleteNoteUsecase(notesRepo);

      let listNotesController = new ListNotesController(listUsecase);
      let createNoteController = new CreateNoteController(createUsecase);
      let updateNoteController = new UpdateNoteController(updateUsecase);
      let deleteNoteController = new DeleteNoteController(deleteUsecase);

      let createNoteM = new CreateNoteM();
      let deleteNoteM = new DeleteNoteM();
      let listNotesM = new ListNotesM();
      let updateNoteM = new UpdateNoteM();

      router.get('/:id', (req: Request, res: Response) => {
         listNotesM.validate;
         listNotesController.execute(req, res);
      });
      router.post('/:id', (req: Request, res: Response) => {
         createNoteM.validate;
         createNoteController.execute(req, res);
      });
      router.put('/:id', (req: Request, res: Response) => {
         updateNoteM.validate;
         updateNoteController.execute(req, res);
      });
      router.delete('/:id', (req: Request, res: Response) => {
         deleteNoteM.validate;
         deleteNoteController.execute(req, res);
      });

      return router;
   }
}
