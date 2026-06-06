import { Router } from "express";
import UserMiddleware, { Role } from "../middleware/userMiddleware";
import errorHandler from "../services/errorHandler";
import CartController from "../controllers/cartController";
const router: Router = Router()

router.post("/add-cart", UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.CUSTOMER), errorHandler(CartController.addToCart))
router.get("/all-items", UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.CUSTOMER), errorHandler(CartController.getMyCartItems))
router.patch("/update-quantity/:productId", UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.CUSTOMER), errorHandler(CartController.updateCartItemQuantity))
router.delete("/delete-cart/:productId", UserMiddleware.isUserLogin, UserMiddleware.accessTo(Role.CUSTOMER), errorHandler(CartController.removeMyCartItem))

export default router