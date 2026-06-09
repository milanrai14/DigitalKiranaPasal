import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartInitalState, ICartItem } from "../pages/cart/types";
import { Status } from "../globals/types/type";
import type { IProduct } from "../pages/product/types";
import { setStatus } from "./authSlice";


const initialState : ICartInitalState = {
    items: [],
    status: Status.LOADING
}


createSlice({
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