import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import axios from "axios";
// import { clearScreenDown } from "readline";



const initialState: IProducts = {
    products: [],
    status: Status.LOADING

}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers:{
        setProduct(state: IProducts, action: PayloadAction<IProduct[]>){
            state.products = action.payload
        },
        setStatus(state: IProducts, action: PayloadAction<Status>){
            state.status = action.payload
        }
    }
}) //Rreducer completed

//Now go for action
export const {setProduct, setStatus} = productSlice.actions
export default productSlice.reducer;

//asynchronous thunk
//fetchproducts

export function fetchProducts(){
    return async function fetchProductsThunk(dispatch: AppDispatch){
        try {
            const response = await axios.get("http://localhost:3000/api/product/")
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(response.data.data))
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log("error", error);
            dispatch(setStatus(Status.ERROR))
            
        }

    }
}