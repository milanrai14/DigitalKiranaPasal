import express from 'express'
import './database/connection'
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import cartRoute from './routes/cartRoute'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.static("./src/uploads")) // Yo code le xai tyo uploads vaneko folder bhitra ko code image lai access garna pauxa
//यो लाइनको मुख्य काम uploads folder भित्र भएका static files (images, PDFs, videos, etc.) लाई browser बाट direct access गर्न दिने हो।
//express.static() express ko built in middleware ho jasle static file server garxa.
//express.static() middleware navayeko vaye http://localhost:3000/photo.jpg maa request garda 404 not found aauthyo.


app.use("/api/auth", userRoute);
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/order" , orderRoute)
app.use("/api/cart", cartRoute)

export default app;
