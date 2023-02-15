import { Request, Response } from "express";

export default class AuthControllers {
    public auth(req: Request, res: Response) {
        res.send('Auth router')
    }
}