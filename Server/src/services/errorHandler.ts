import type { Request, Response } from "express"


//Error Handling = Higher Order Function
//Callback function = fn
const errorHandler = (fn: Function)=>{
    return(req: Request, res: Response)=>{
        fn(req,res).catch((err: Error)=>{
            res.status(500).json({
                message : "Internal error",
                errorMessage : err.message
            })
            return
        })
    }


}
export default errorHandler