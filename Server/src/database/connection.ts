import {Sequelize} from 'sequelize-typescript'
import { envConfig } from '../config/config';
import User from './Models/userModels';
import Category from './Models/categoryModel';
import Product from './Models/productModels';
import Order from './Models/orderModel';
import Payment from './Models/paymentModel';
import OrderDetails from './Models/orderDetail';
import Cart from './Models/cartModel';


const sequelize = new Sequelize(envConfig.connectionString as string,{
    models : [User, Category, Product, Order, Payment, Order
      , OrderDetails, Cart
    ]
})

// Test the connections
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync({ force: false, alter: false }); // created and update the tables
    //alter just change the name of column
    //force: true deletes the table value
    console.log("✅ Tables synced");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // stop server if DB fails
  }
}



// //relationship
// Product.belongsTo(Category) // belongs side get the foreign key. So, product table gets categoryId  (belongsTo(Create the foreign key))
// Category.hasMany(Product)

//Relationship: Order X User
Order.belongsTo(User,{foreignKey: "userId"})
User.hasMany(Order,{foreignKey: "userId"})

//Order X OrderDetails
OrderDetails.belongsTo(Order, {foreignKey: "orderId"})
Order.hasMany(OrderDetails, {foreignKey: "orderId"})

//OrderDetails X Product 
OrderDetails.belongsTo(Product, {foreignKey: 'productId'})
Product.hasMany(OrderDetails, {foreignKey: "productId"})

//Payment X Order
Payment.belongsTo(Order, {foreignKey: "orderId"})
Order.hasOne(Payment, {foreignKey: "orderId"})

//User X Cart
Cart.belongsTo(User,{foreignKey: "userId"})
User.hasOne(Cart, {foreignKey: "userId"})

//Product X Cart
Cart.belongsTo(Product, {foreignKey: "productId"})
Product.hasMany(Cart, {foreignKey: "productId"})

export default sequelize;