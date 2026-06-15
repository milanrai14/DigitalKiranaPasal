import type { Status } from "../../globals/types/type";



export interface IOrderItem{
    productId : string,
    quantity: number,
    orderId: string
}
export interface IOrder{
    status: Status,
    items: IOrderItem[]
}

enum PaymentMethod{
    Esewa = "esewa",
    Khalti = "khalti",
    Cod = "Cod"
}

export interface IData{
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    city: string,
    addressLine: string,
    state: string,
    zipcode: string,
    totalAmount: number,
    paymentMethod: PaymentMethod,
    products: 
}