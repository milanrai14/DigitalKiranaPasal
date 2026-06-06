import { config } from "dotenv";
config()

export const envConfig = {
    port: process.env.PORT || 4000,
    connectionString : process.env.CONNECTION_STRING,
    jwtsecretKey : process.env.JWT_SECRET_KEY,
    jwtExpiresIn : process.env.JWT_EXPIRES_IN || "7d",
    email : process.env.EMAIL,
    password : process.env.PASSWORD,
    adminEmail : process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminUsername: process.env.ADMIN_USERNAME

}
