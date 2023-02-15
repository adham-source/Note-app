import { NextFunction, Request, Response } from 'express'
import validationNoteSchema from '../utilities/validate'
import { IUser } from '../services/interfaces';
import { createLocals } from '../services/customFunctions';

export default class Validator {
    public validateNote = (req: Request, res: Response, next: NextFunction): void => {
        const { _id } = req.user as IUser
        try {
            validationNoteSchema.parse({...req.body, createdBy: _id.toString() });
            next()
        } catch {
            res.status(400).render("dashboard/notes/add", { success: false, message: 'All fields are required', locals: createLocals("Errors") });
        }
    }
}

