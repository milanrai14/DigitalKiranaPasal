import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItem } from "../pages/checkout/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";


const initialState: IOrder = {
    status: Status.LOADING,
    items: []
}


const checkoutSlice = createSlice({
    name: "checkout",
    initialState: initialState,
    reducers: {
        setItems(state: IOrder, action: PayloadAction<IOrderItem[]>){
            state.items = action.payload
        },
        setStatus(state: IOrder, action: PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

export default checkoutSlice.reducer
export const {setItems, setStatus} = checkoutSlice.actions



function orderItem(data: IData){
    return async function orderitemThunk(dispatch: AppDispatch){
        try {
            await APIWITHTOKEN.post("http://localhost:3000/api/order/create-order",)
        } catch (error) {
            
        }
    }
}