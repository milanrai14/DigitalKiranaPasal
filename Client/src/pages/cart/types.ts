import type { Status } from "../../globals/types/type"
import type { IProduct } from "../product/types"

export interface ICartItem{
    product: IProduct,
    quantity: number
}

export interface ICartInitalState{
    items : ICartItem[],
    status: Status
}