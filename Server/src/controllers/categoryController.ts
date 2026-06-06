import Category from "../database/Models/categoryModel";
import type{Request, Response} from 'express'




class CategoryController {
    static categoryData = [
        {
            categoryName: "Electronics"
        },
        {
            categoryName: "Groceries"
        },
        {
            categoryName: "Foods"
        }
    ];

    static async seedCategory(): Promise<void> {
        const datas = await Category.findAll()
        if(datas.length === 0){
         // await Category.bulkCreate(this.categoryData); //using thebulkCreate Method which accept array

        //Another way
        for (const cateory of this.categoryData){
            await Category.create(cateory)
        }           
        } else {
            console.log("Category Already seeded!");

        }

    }

    static async addCategory(req: Request, res: Response):Promise<void>{
        // @ts-ignore 
        console.log(req.userId);
        const {categoryName} = req.body
        if(!categoryName){
            res.status(400).json({
                message: "Please provide categoryname"
            })
            return
        }
        await Category.create({
            categoryName
        })
        res.status(200).json({
            message: "Category created Successfully!"
        })
    }

    static async getCategries(req: Request, res: Response): Promise<void> {
        const data = await Category.findAll()
        res.status(200).json({
            message: "Fetched Category",
            data: data
        })
    }

    static async deleteCategory(req: Request, res: Response):Promise<void>{
        const {id} = req.params
        if(!id){
            res.status(400).json({
                message: "Please provide id to delete"
            })
            return
        }
        const data = await Category.findAll({ // retrun array
            where: {
                id: id
            }
        })
        //const data = await Category.findByPk(id) //Object retrun
        if(data.length ===0){
            res.status(400).json({
                message: "No category with that id"
            })
        } else {
            await Category.destroy({
                where:{
                    id: id
                }
            })
            res.status(200).json({
                message: "Category deleted successfully"
            })
        }
    }

    static async updateCategory(req: Request, res: Response):Promise<void>{
        const {id} = req.params
        const {categoryName} = req.body
        if(!id || !categoryName){
            res.status(400).json({
                message: "Please provude id and categoryname to update"
            })
            return
        }
        
        const [data] = await Category.findAll({
            where: {
                id: id
            }
        })

        if(!data){
            res.status(400).json({
                message: "No Category with that id"
            })
        } else {
           await Category.update({ //update take a two parameter as a object
            categoryName: categoryName
           },{
            where: {
                id : id
            }
           })
           res.status(200).json({
            message: `Category updated successfully from ${data.categoryName} to ${categoryName}`
           })
        }

    }


}
export default CategoryController