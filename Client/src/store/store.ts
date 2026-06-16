import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import productSlice from './productSlice'
import Checkout from "../pages/checkout/Checkout";
import checkoutSlice from "./checkoutSlice"




const store = configureStore({
    reducer:{
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        checkout: checkoutSlice
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
