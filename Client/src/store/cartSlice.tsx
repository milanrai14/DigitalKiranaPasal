import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartInitalState, ICartItem, ICartUpdateItem } from "../pages/cart/types";
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
        },
        setUpdateCartItem(state: ICartInitalState, action: PayloadAction<ICartUpdateItem>){
            const index = state.items.findIndex(item=>item.Product.id == action.payload.productId)

            if(index !== -1){ //find some data
                state.items[index].quantity = action.payload.quantity
            }
        },
        setDeleteCartItem(state: ICartInitalState, action: PayloadAction<string>){
            const index = state.items.findIndex(item=>item.Product.id == action.payload)
                 if(index !== -1){ //find some data
                state.items.splice(index, 1)
            }
        }
    }
})

export const {setItems, setStatus, setUpdateCartItem, setDeleteCartItem} = cartSlice.actions;
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

export function handleCartItemUpdate(productId: string, quantity: number){
    return async function handleCartItemUpdateThunk(dispatch: AppDispatch){
       try {
            dispatch(setStatus(Status.LOADING))
            const response = await APIWITHTOKEN.patch("/cart/update-quantity/"+productId,{
                quantity: quantity
            })
            if(response.status === 200){
                dispatch(setUpdateCartItem({productId, quantity}))
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


export function handleCartItemDelete(productId: string){
    return async function handleCartItemUpdateThunk(dispatch: AppDispatch){
       try {
            dispatch(setStatus(Status.LOADING))
            const response = await APIWITHTOKEN.delete("/cart/delete-cart/"+productId) //http://localhost:3000/api/cart/delete-cart/
            if(response.status === 200){
                dispatch(setDeleteCartItem(productId))
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