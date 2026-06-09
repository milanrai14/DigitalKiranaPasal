import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartInitalState, ICartItem } from "../pages/cart/types";
import { Status } from "../globals/types/type";
import type { IProduct } from "../pages/product/types";
import axios from "axios";
import type { AppDispatch } from "./store";



const initialState : ICartInitalState = {
    items: [],
    status: Status.LOADING
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setItems(state:ICartInitalState, action: PayloadAction<ICartItem[]>){
            state.items = action.payload;
        },
        setStatus(state: ICartInitalState, action:PayloadAction<Status>){
            state.status = action.payload;
        }
    }
})

export const {setItems, setStatus} = cartSlice.actions;
export default cartSlice.reducer;


//Asynchronous thunk

function addToCart(){
    return async function addToCartThunk(dispatch: AppDispatch){
        try {
           const response =  await axios.post("http://localhost:3000/api/cart/add-cart");
        } catch (error) {
            
        }

    }
}