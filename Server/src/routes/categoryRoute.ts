import {Router} from 'express'
import CategoryController from '../controllers/categoryController';
import UserMiddleware, { Role } from '../middleware/userMiddleware';
import errorHandler from '../services/errorHandler';
const router: Router = Router()

router.post("/add-category",UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), errorHandler(CategoryController.addCategory))
router.delete("/delete-category/:id", UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), errorHandler(CategoryController.deleteCategory))
router.patch("/update-category/:id",UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), errorHandler(CategoryController.updateCategory))
router.get("/", errorHandler(CategoryController.getCategries))

export default router