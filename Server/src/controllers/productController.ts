import type{NextFunction, Request, Response} from 'express'
import Product from '../database/Models/productModels';
import Category from '../database/Models/categoryModel';

// interface IProductRequest extends Request{
//     file?: Express.Multer.File
// }

// After installing multer, req interface automatically contains file and files
class ProductController{ //add, delete update , get,product
    static async createProduct(req: Request, res: Response): Promise<void>{
        const {productName, productDescription, productPrice, productDiscount, productTotalStocks, categoryId} = req.body

        const filename = req.file? req.file.filename : "ImageLinkHere"
        
        if(!productName || !productDescription || !productPrice || !productTotalStocks || !categoryId){
            res.status(400).json({
                message: "Please provide the product name, product description, product price, product total stocks and category Id"
            })
            return
        }

        await Product.create({
            productName,
            productDescription, 
            productPrice, 
            productDiscount : productDiscount || 0, 
            productTotalStocks, 
            categoryId,
            productImageUrl: filename
        })
        res.status(200).json({
            message: "Product create successfully"
        })
    }

    static async getAllProducts(req: Request, res: Response): Promise<void> {
        const datas = await Product.findAll({
            include: [
                {
                    model: Category
                }
            ]
        })
        if(datas.length === 0){
            res.status(400).json({
                message: "No data found"
            })
            return
        }
        res.status(200).json({
            message: "All products fetched successfully",
            data: datas
        })
    }

    static async getSingeProduct(req: Request, res: Response): Promise<void>{
        const {id} = req.params
        const [data] = await Product.findAll({
            where: {
                id: id
            },
            include:[
                {
                    model: Category
                }
            ]
        })
        if(!data){
            res.status(400).json({
                message: "No product found"
            })
            return
        }
        res.status(200).json({
            message: "Single product fetched successfully!",
            data: data
        })

    }

    static async deleteSingleProduct(req: Request, res: Response): Promise<void>{
        const {id} = req.params

        const data = await Product.findAll({
            where:{
                id:id
            }
        })

        if(data.length === 0){
            res.status(400).json({
                message: "Product not found"
            })
            return
        }
        await Product.destroy({
            where:{
                id: id

            }
        })
        res.status(200).json({
            message: `Product delete successfully ${data[0]?.productName}`
        })
    }

    static async updateProduct(req: Request, res: Response): Promise<void>{
        const {id} = req.params

        const [data] =  await Product.findAll({
            where: {
                id: id
            }
        })

        if(!data){
            res.status(400).json({
                message: "product not found"
            })
            return
        }

        const updateData: any = {
            ...req.body
        }

        if(req.file){
            updateData.productImageUrl = req.file.filename
        }

        await data.update(updateData)
        res.status(200).json({
            message : "Product updated successfully",
            data: data
        })


    }

}


export default ProductController