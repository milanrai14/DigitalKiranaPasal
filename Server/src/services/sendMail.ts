import nodemailer from 'nodemailer'
import { envConfig } from '../config/config';
// import { from } from 'node:stream/iter';

interface IData{
    to : string,
    subject: string,
    text: string
}
const sendMail = async(data: IData)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { //pathauney ko email ra app password ho
            user: envConfig.email,
            pass: envConfig.password         // Use app password
        }
    })
    const mailOptions = {
        from : "Digital Pasal <testmilan14@gmail.com>",
        to: data.to,
        subject: data.subject,
        text: data.text
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }

}
export default sendMail