import type { Status } from "../../globals/types/type"




export interface ICartProduct{
    id: string,
    productName: string,
    productImageUrl: string,
    productPrice: number

}


export interface ICartItem{
    id: string,
    quantity: number,
    productId: string,
    Product: ICartProduct

}

export interface ICartInitalState{
    items : ICartItem[],
    status: Status
}

