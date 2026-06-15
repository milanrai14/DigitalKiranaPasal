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



export function orderItem(data: IData){
    return async function orderitemThunk(dispatch: AppDispatch){
        try {
            const response =await APIWITHTOKEN.post("http://localhost:3000/api/order/create-order", data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data)) // backend bata aako respones
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

