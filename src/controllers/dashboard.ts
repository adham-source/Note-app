import { Request, Response } from "express"
import { createLocals } from "../services/customFunctions"

export default class DashboardControllers {
    /**
     * @Method GET
     * @Route /dashboard
     * @Access Private
     */
    public dashboard(req: Request, res: Response): void {
        //@ts-ignore
        const { firstName } = req.user
        res.render('dashboard/index', {
            locals: createLocals("Dashboard"),
            name: firstName
        })
    }
}
