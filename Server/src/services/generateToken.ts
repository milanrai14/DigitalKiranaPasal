import jwt from 'jsonwebtoken'
import { envConfig } from '../config/config';

const generateToken = (userId: string)=>{
    //generate token == jwt.sign({k lukaune},pin code, {expiredata kaile samma on rakhne})
    const token = jwt.sign({userId: userId}, envConfig.jwtsecretKey as string,{
        expiresIn: "2d"
    })
    return token

}

export default generateToken