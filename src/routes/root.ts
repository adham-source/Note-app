import { Router } from 'express'
import RootControllers from '../controllers/root'
const router = Router()

const { homePage, aboutPage } = new RootControllers()

router.route('^/$|/index(.html)?').get(homePage)
router.route('/about').get(aboutPage)

export default router
