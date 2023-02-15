import { Request, Response } from "express"
import { createLocals } from "../services/customFunctions"

export default class RootControllers {
    /**
     * @Method GET
     * @Route / || /index || /index.html
     * @Access public
     */
    public homePage(_req: Request, res: Response): void {
        res.render('index', {
            locals: createLocals("Home"),
        })
    }

    /**
     * @Method GET
     * @Route /about
     * @Access public
     */
    public aboutPage(_req: Request, res: Response): void {
        res.render('about', { locals: createLocals("About") },)
    }
}
