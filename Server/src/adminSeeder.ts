import { envConfig } from "./config/config";
import User from "./database/Models/userModels";
import bcrypt from 'bcrypt'


const adminSeeder = async()=>{
    const [admin] =await User.findAll({
        where: {
            email: envConfig.adminEmail
        }
    })
    if(!admin){
    await User.create({
        username: envConfig.adminUsername,
        password: bcrypt.hashSync(envConfig.adminPassword as string, 12),
        email: envConfig.adminEmail,
        role: "admin"

    })
    console.log("Admin seeded");
    } else{
        console.log("Admin already Seeded!!");
    }

}

export default adminSeeder