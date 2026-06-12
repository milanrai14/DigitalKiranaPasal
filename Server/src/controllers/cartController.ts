import type { Request, Response } from "express";
import Cart from "../database/Models/cartModel";
import Product from "../database/Models/productModels";
import User from "../database/Models/userModels";

interface AuthRequest extends Request{
    user?:{
        id: string
    }
}



class CartController{
    static async addToCart(req: AuthRequest, res:Response){
        //userId, productd, quantity
        const userId = req.user?.id;
        const {productId, quantity} = req.body;

        if(!userId){
            res.status(400).json({
                message: "Unauthorized"
            })
            return
        }

        if(!productId || !quantity){
            res.status(400).json({
                message: "Please provide productId, quantity"
            })
            return
        }

        //check if that item already exist on that user cart ---if ---> just qty ++ / else insert

        let existingitem = await Cart.findOne({ // findOne , findByPK retrun in object, not in array
            where: {
                productId,
                userId
            }
        })

        if(existingitem){
            //increase the cart Item
            existingitem.quantity =  existingitem.quantity + quantity
            await existingitem.save()
            const cardData = await Cart.findAll({
                where: {
                    userId
                },
                include:[
                    {
                        model: Product,
                        attributes: ["id", "productName", "productPrice", "productImageUrl"]
                    },
                    {
                        model: User,
                        attributes: ["id", "username", "email"]
                    }
                ]
            })
            res.status(200).json({
                message: "Item Increases",
                IncreaseQuantity: existingitem.quantity,
                data: cardData
                
            })

        } else{
            const addItem = await Cart.create({
                userId,
                productId,
                quantity
            })
            const cartData = await Cart.findAll({
                where: {
                    userId
                },            include:[
                {
                    model: Product,
                    attributes: ['id', 'productName', 'productPrice', 'productImageUrl']
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email']
                }
            ]
            });
            res.status(200).json({
                message: "Product added to cart.",
                addedItem: addItem,
                data: cartData

            })
        }

    }

    static async getMyCartItems(req: AuthRequest, res: Response){
        const userId = req.user?.id;

        if(!userId){
            res.status(400).json({
                message: "Unauthorized"
            })
            return
        }

        const cartItems = await Cart.findAll({
            where:{
                userId
            },
            include : [
                {
                    model: Product,
                    attributes: ['id', 'productName', 'productPrice', 'productImageUrl']
                },
            ]
    })

        if(cartItems.length ===0){
            res.status(400).json({
                message: "No items in the cart"
            })
        } else {
            res.status(200).json({
                message: "Cart items fetched successfully",
                data: cartItems

            })
        }
    }

    static async removeMyCartItem(req: AuthRequest, res: Response){
        const userId = req.user?.id
        const {productId} = req.body

        const deleted = await Cart.destroy({
            where:{
                productId,
                userId
            }
        })
        if(!deleted){
            return res.status(404).json({
                message: "Items not found"
            })
        }
        res.status(200).json({
            message: "Product from cart deleted successfully"
        })


    }
    
    static async updateCartItemQuantity(req: AuthRequest, res: Response){
        const userId = req.user?.id
        const {productId} = req.params
        const {quantity} = req.body

        if(!quantity){
            res.status(400).json({
                message: "Please provide quantity"
            })
            return
        }
        const cartItem = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })
        if(!cartItem){
            res.status(404).json({
                message: "No product Id in Cart"
            })
        } else {
            cartItem.quantity = quantity
            await cartItem.save()
            res.status(200).json({
                message: "Cart updated successfully"
            })
        }


    }
} 

export default CartController