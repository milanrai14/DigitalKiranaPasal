
import type{NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/config';
import User from '../database/Models/userModels';

export enum Role{
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

interface IExtendedRequest extends Request{
    user?: {
        username: string,
        email: string,
        role : string,
        password: string,
        id: string
    }
}


class UserMiddleware{
    static async isUserLogin(req: IExtendedRequest, res: Response, next: NextFunction): Promise<void> {
        //Login checking using token
        //receive token
        const token = req.headers.authorization
        if(!token){
            res.status(403).json({
                message: "Token must be provided"
            })
            return
        }
        //validate
        jwt.verify(token, envConfig.jwtsecretKey as string, async (err, result: any)=>{
            if(err){
                res.status(403).json({
                    message: "Invalid token"
                })
            } else {
                console.log(result); //k value lai lukako thyo tyo nai aauxa
                const userData = await User.findByPk(result.userId)
                if(!userData){
                    res.status(404).json({
                        message: "No user with that userID"
                    })
                    return
                }
                //user id
                req.user = userData
                
                next()
            }
        })

    }
    //role base authorization
    static accessTo(...roles:Role[]){ //spread operator in array
    return (req: IExtendedRequest, res: Response, next: NextFunction)=>{
        let userRole = req.user?.role as Role
        console.log(userRole, "Role");
        if(!roles.includes(userRole)){
            res.status(403).json({
                message: "You dont have permission"
            })
            return
        }
        next()
    }
    }
}

export default UserMiddleware