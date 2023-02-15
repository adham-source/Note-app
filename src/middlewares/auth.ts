import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).redirect("/")
        return
    }
    next() 
}


export default auth