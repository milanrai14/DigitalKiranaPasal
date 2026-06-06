import {Router} from 'express'
import UserMiddleware from '../middleware/userMiddleware'
import OrderController from '../controllers/orderController'
import errorHandler from '../services/errorHandler'
const router: Router = Router()



router.post("/create-order", UserMiddleware.isUserLogin, errorHandler(OrderController.createOrder))
router.post("/verify-pidx", UserMiddleware.isUserLogin, errorHandler(OrderController.verifyTransaction))

export default router; 