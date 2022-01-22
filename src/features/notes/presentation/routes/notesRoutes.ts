import { Router } from 'express';
import CreateNoteM from '../../domain/middlewares/createNoteM';
import DeleteNoteM from '../../domain/middlewares/deleteNoteM';
import ListNotesM from '../../domain/middlewares/listNotesM';
import UpdateNoteM from '../../domain/middlewares/updateNoteM';
import NotesRepository from '../../infra/repositories/notesRepository';
import CreateNoteController from '../controllers/createNoteController';
import DeleteNoteController from '../controllers/deleteNoteController';
import ListNotesController from '../controllers/listNotesController';
import UpdateNoteController from '../controllers/updateNoteController';

export default class NotesRoutes {
   static initRouter(): Router {
      let router = Router();

      let notesRepo = new NotesRepository();

      let listNotesController = new ListNotesController(notesRepo);
      let createNoteController = new CreateNoteController(notesRepo);
      let updateNoteController = new UpdateNoteController(notesRepo);
      let deleteNoteController = new DeleteNoteController(notesRepo);

      let createNoteM = new CreateNoteM();
      let deleteNoteM = new DeleteNoteM();
      let listNotesM = new ListNotesM();
      let updateNoteM = new UpdateNoteM();

      router.get('/:id', listNotesM.validate, listNotesController.execute);
      router.post('/:id', createNoteM.validate, createNoteController.execute);
      router.put('/:id', updateNoteM.validate, updateNoteController.execute);
      router.delete('/:id', deleteNoteM.validate, deleteNoteController.execute);

      return router;
   }
}
