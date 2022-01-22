import { NextFunction, Request, Response } from 'express';
import Middleware from '../../../../core/domain/contracts/middleware';
import IdError from '../errors/idError';
import LengthError from '../errors/lengthError';

export default class CreateNoteM implements Middleware {
   async validate(req: Request, res: Response, next: NextFunction) {
      let { detail, description } = req.body;
      let id = req.params.id;

      if (detail > 500) {
         throw new LengthError();
      }

      if (description > 50) {
         throw new LengthError();
      }

      if (id.length != 36) {
         throw new IdError();
      }

      next();
   }
}
