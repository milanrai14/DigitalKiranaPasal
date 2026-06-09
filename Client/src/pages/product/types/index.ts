import type { Status } from "../../../globals/types/type";


interface ICategory{
    id: string,
    categoryName: string,
    createdAt: string,
    updatedAt: string
}


export interface IProduct{
    id: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    productTotalStock: number,
    productDiscount: number,
    productImageUrl: string,
    categoryId: string,
    createdAt: string,
    updatedAt: string,
    Category : ICategory
}

export interface IProducts{
    products : IProduct[],
    selectedProduct: IProduct | null
    status: Status
}