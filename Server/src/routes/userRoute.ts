import {Router} from 'express'
import UserController from '../controllers/userController';
import errorHandler from '../services/errorHandler';


const router: Router = Router()

//UserController route 
router.post("/register", errorHandler(UserController.register))
router.post("/login", errorHandler(UserController.login))
router.post("/forget-password", errorHandler(UserController.handleForgetPassword))
router.post("/reset-password", errorHandler(UserController.resetPassword))



export default router;