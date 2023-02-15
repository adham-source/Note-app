import { Router } from "express";
import routerAuth from './auth';
import routerRoot from "./root";
import routeDashboard from "./dashboard";
import routeNotes from './api/notes'
import auth from "../middlewares/auth";
import rateLimit from '../services/rateLimit'

const router = Router()

router.use('/', routerRoot)
router.use('/', routerAuth)
router.use(auth)
router.use(rateLimit)
router.use("/dashboard", routeDashboard)
router.use('/dashboard/notes', routeNotes)

export default router

