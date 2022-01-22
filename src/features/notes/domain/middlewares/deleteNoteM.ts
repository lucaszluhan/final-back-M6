import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';
import Middleware from '../../../../core/domain/contracts/middleware';
import IdError from '../errors/idError';

export default class DeleteNoteM implements Middleware {
   async validate(req: Request, res: Response, next: NextFunction) {
      let id = req.params.id;

      if (id.length > 32) {
         throw new IdError();
      }

      next();
   }
}
