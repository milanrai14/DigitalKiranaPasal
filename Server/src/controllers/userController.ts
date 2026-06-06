import type {Request, Response} from 'express'
import User from '../database/Models/userModels';
import bcrypt, { hashSync } from 'bcrypt'
import generateToken from '../services/generateToken';
import generateOTP from '../services/generateOTP';
import sendMail from '../services/sendMail';
import verifyOTP from '../services/verifyOTP';

class UserController{
    static async register(req: Request, res: Response){
        //Incoming user data receive
        const {username, email, password} = req.body

        if(!username || !email || !password){
            res.status(400).json({
                message: "Please provide username, email, and password"
            })
            return
        }
        //check wheather the data is already exist or not
        const [data] = await User.findAll({ //Users data return in array like object or [data] destructuring
            where: {
                email: email
            }
        })
        if (data){
            res.status(400).json({
                message: "Email Already use"
            })
            return
        }

        //Another way to do
        // const users = await User.findAll({
        //     where: {
        //         email : email
        //     }
        // })

        // if (users.length >0){
        //     res.status(400).json({
        //         message: "Email already use"
        //     })
        // }

        //Create user if the email is not already use
        //checking the duplicate username
        const existingUsername = await User.findOne({
            where: {
                username: username
            }
        })
        if (existingUsername){
            return res.status(400).json({
                message: "Username already exist"
            })
        }
        const user = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password,12)
        })
        await sendMail({
            to: email,
            subject: "Registered successfully",
            text: "Welcome to digital dokna"
        })
        res.status(200).json({
            message : "User register successfully",
            data: user
        })

    }

    static async login(req: Request, res: Response){
        //reciving data from user
        const {email, username, password} = req.body

        if((!email && !username) || !password){
            return res.status(400).json({
                message: "Please provide email/username and password!"
            })
        }

        const [user] = await User.findAll({
            where: {
                [email ? "email" : "username"] : email || username
            }
        })

        if(!user){
            return res.status(400).json({
                message: "No Email/Usename was registered in the system"
            })
        }

        const isEqual = bcrypt.compareSync(password, user.password) //compareSync le duita parameter linxa euta login garda ko password and arko encrypted password(hash password)
        if(!isEqual){
            res.status(400).json({
                message: "Invalid password and email"
            })
        } else { //Yedi milyo vane token generate garne
            const token = generateToken(user.id)
            await sendMail({
                to: email,
                subject: "User login",
                text: "Login successfully"
            })
            res.status(200).json({
                message: "Login successfully",
                token
            })

        }


    }

    static async handleForgetPassword(req: Request, res: Response){
        const {email} = req.body

        if(!email){
            return res.status(400).json({
                message: "Please provide the email."
            })
        }
        const [user] = await User.findAll({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(400).json({
                message: "Email not registered!!"
            })
        }

        //send otp by generation otp and send to this mail
        const otp = generateOTP()
        await sendMail({
            to: email,
            subject: "Digital pasal password",
            text: `You have to reset the password. Here is your otp, ${otp}`
        })
        user.otp = otp.toString()
        user.otpGeneratedTime = Date.now().toString()
        await user.save()

        res.status(200).json({
            message: "Password reset OPT sent."
        })
    }

    static async resetPassword(req: Request, res: Response){
       const {newPassword, confirmPassword, email, otp} = req.body

       if(!email || !otp || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: "Please provide email, otp, newpassword, and confirm password"
        })
       }

       //check if password match
       if(newPassword !== confirmPassword){
        return res.status(400).json({
            message: "New password and confirm password must be same"
        })
       }

       try {
        //verify otp
        const user = await verifyOTP(email, otp) // throws error if otp invalid or expire
        //hash the new password
        user.password = bcrypt.hashSync(newPassword, 12)
        await user.save()

        await sendMail({
            to: email,
            subject: "Password reset successfully",
            text: "Your password reset successfully"
        })

        return res.status(200).json({
            message: "Password reset successfully"
        })
       } catch (error) {
        //if otp is invalid or expire
        return res.status(400).json({
            message: error
        })
       }

       
    }


}

export default UserController