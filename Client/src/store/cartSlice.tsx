import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartInitalState, ICartItem } from "../pages/cart/types";
import { Status } from "../globals/types/type";
import type { IProduct } from "../pages/product/types";
import axios from "axios";
import type { AppDispatch } from "./store";
import { API, APIWITHTOKEN } from "../http";




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

// export function addToCart(productId: string){
//     return async function addToCartThunk(dispatch: AppDispatch){
//         try {
//             dispatch(setStatus(Status.LOADING))
//            const response =  await APIWITHTOKEN.post("/cart/add-cart", {
//             productId: productId,
//             quantity: 1
//            })
//            if(response.status === 200){
//             dispatch(setStatus(Status.SUCCESS))
//             dispatch(setItems(response.data.data))
//            } else {
//             dispatch(setStatus(Status.ERROR))
//            }
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(Status.ERROR))
//         }

//     }
// }
export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));

      const response = await APIWITHTOKEN.post("/cart/add-cart", {
        productId,
        quantity: 1,
      });

      if (response.status === 200) {
        dispatch(fetchCartItems()); // Refresh cart items
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch: AppDispatch){
        try {
            dispatch(setStatus(Status.LOADING))
            const response = await APIWITHTOKEN.get("/cart/all-items")
            if(response.status === 200){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}