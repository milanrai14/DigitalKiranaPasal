import {Router} from 'express'
import ProductController from '../controllers/productController';
import UserMiddleware, { Role } from '../middleware/userMiddleware';
import {multer, storage} from '../middleware/multerMiddleware'
import errorHandler from '../services/errorHandler';
const uploads = multer({storage: storage})
const router: Router = Router()


router.get("/", errorHandler(ProductController.getAllProducts))
router.get("/single-product/:id", errorHandler(ProductController.getSingeProduct))
router.post("/add-product",UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), uploads.single('productImageUrl'),errorHandler(ProductController.createProduct))
router.patch("/update-product/:id",UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), uploads.single('productImageUrl'), errorHandler(ProductController.updateProduct))
router.delete("/delete-product/:id",UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.ADMIN), errorHandler(ProductController.deleteSingleProduct))

export default router