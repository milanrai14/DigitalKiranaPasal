import type { Request, Response } from "express"
import Order from "../database/Models/orderModel"
import OrderDetails from "../database/Models/orderDetail"
import { PaymentMethod, PaymentStatus } from "../globals/types"
import Payment from "../database/Models/paymentModel"
import axios from "axios"
import { promises } from "nodemailer/lib/xoauth2"
import Cart from "../database/Models/cartModel"

interface IProduct{
    productId : string,
    productQuantity : number
}

interface IOrderRequest extends Request{
    user?:{
        id : string

    }
}


class OrderController {
    static async createOrder(req: IOrderRequest, res: Response) {
            const userId = req.user?.id;

            const {
                phoneNumber,
                shippingAddress,
                totalAmount,
                paymentMethod,
                products,
                firstName,
                lastName,
                email,
                city,
                zipcode,
                state,
                addressLine


            } = req.body;

            if (!phoneNumber || !shippingAddress || !totalAmount || !products || products.length === 0 || !firstName || !lastName || !email || !city || !zipcode || !state || !addressLine) {
                return res.status(400).json({
                    message: "Please provide phoneNumber, shippingAddress, totalAmount, products"
                });
            }

            // 1. Create Order
            const orderData = await Order.create({
                phoneNumber,
                shippingAddress,
                totalAmount,
                userId,
                firstName,
                lastName,
                email,
                city,
                state,
                addressLine,
                zipcode
            });

            // 2. Create OrderDetails (IMPORTANT FIX)
            for (const product of products) {
                await OrderDetails.create({
                    quantity: product.productQuantity,
                    productId: product.productId,
                    orderId: orderData.id
                });

                await Cart.destroy({ // saman kinisakey paxi udauney cart bata
                    where:{
                        productId: product.productId,
                        userId: userId
                    }
                })
            }

            // 3. Payment
            let paymentData;
            if (paymentMethod === PaymentMethod.COD) {
                paymentData =await Payment.create({
                    orderId: orderData.id,
                    paymentMethod
                });
            } else if(paymentMethod === PaymentMethod.Khalti){
                //Khalti logic
                const data = {
                    return_url: "http://localhost:5173/",
                    website_url: "http://localhost:5173/",
                    amount: totalAmount * 100,
                    purchase_order_id: orderData.id,
                    purchase_order_name: "order_" + orderData.id
                }
                const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data,{
                    headers: {
                        Authorization:"Key dcb16e7eac7547f6a0f7bc7244b6849e"
                    }
                })
                const khaltiResponse = response.data
                console.log(khaltiResponse);
                paymentData = await Payment.create({
                    orderId: orderData.id,
                    paymentMethod: PaymentMethod.Khalti,
                    pidx : khaltiResponse.pidx
                })
            
                paymentData.save()
                res.status(200).json({
                message: "Order created successfully",
                orderId: orderData.id,
                url: khaltiResponse.payment_url,
                pidx: khaltiResponse.pidx,
            });
                
            } else {
                res.status(200).json({
                    message: "Order created successfully!"
                })
            }

    }
    
    static async verifyTransaction(req: IOrderRequest, res: Response): Promise<void>{
        const {pidx} = req.body;
        if(!pidx){
            res.status(400).json({
                message: "please prodvide pidx",
                pidx: pidx
            })
            return
        }
        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", {
            pidx: pidx
        },{
            headers:{
                Authorization: "Key dcb16e7eac7547f6a0f7bc7244b6849e"
            }
        })
        console.log(response);
        const data = response.data
        if(data.status=== "completed"){
            await Payment.update({paymentStatus: PaymentStatus.Paid},{
                where: {
                    pidx: pidx
                }
            })
        }
        res.status(200).json({
            message: "Payment not verified successfully!!"
        })
    }
}

export default OrderController
/*
{
shippingAddress: lx,
phoneNumber: 9800000,
totalAmount: 200,
products: [
{
productId: 1234,
productQty: 2
}, 
{
productId: 4567,
productQty: 3
}
]

}
 */