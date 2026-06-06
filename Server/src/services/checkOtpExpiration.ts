

const checkOtpExpiration = (otpGeneratedTime: string, thresholdTime: number): boolean =>{
    const currentTime = Date.now()

    if(currentTime -parseInt(otpGeneratedTime) <= thresholdTime){
        return true //otp valid
    }
    return false
}

export default checkOtpExpiration