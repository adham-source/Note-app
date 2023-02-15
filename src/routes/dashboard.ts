import { Router } from 'express'
import DashboardControllers from '../controllers/dashboard'
const router = Router()

const { dashboard } = new DashboardControllers()

router.route('/').get(dashboard)

export default router
