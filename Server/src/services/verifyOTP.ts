import User from "../database/Models/userModels";
import checkOtpExpiration from "./checkOtpExpiration";



const verifyOTP = async (email: string, otp: string) =>{
    if(!email || !otp){
        throw new Error("Email and OTP are required")
    }

    const [user] = await User.findAll({
        where: {
            email : email
        }
    })

    if (!user){
        throw new Error("User not found")
    }

    if(user.otp !== otp){
        throw new Error("Invalid OTPd")
    }

    const otpExpireation = 5 * 60 *1000; //5 minutes
    if(!checkOtpExpiration(user.otpGeneratedTime, otpExpireation)){
        throw new Error("OTP expired! Please request a new one")
    }
    return user

}

export default verifyOTP