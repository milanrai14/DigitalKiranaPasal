import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types";
import { Status } from "../globals/types/type";
import type { AppDispatch, RootState } from "./store";
import axios from "axios";

// import type { RootState } from "@reduxjs/toolkit/query";
// import { clearScreenDown } from "readline";

const initialState: IProducts = {
  products: [],
  selectedProduct: null,
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProduct(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<IProduct>) {
      state.selectedProduct = action.payload;
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
}); //Rreducer completed

//Now go for action
export const { setProduct, setSelectedProduct, setStatus } =
  productSlice.actions;
export default productSlice.reducer;

//asynchronous thunk
//fetchproducts

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.get("http://localhost:3000/api/product/");
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//fetch single products
// export function fetchSingleProduct(id: string){
//     return async function fetchSingleProductThunk(dispatch: AppDispatch, getState: ()=> RootState){
//         const store = getState()
// const productExist = store.product.products.find(
//   (product: IProduct) => product.id === id
// );; //this search in frontend

//         if(productExist){
//             dispatch(setProduct([productExist]));
//             dispatch(setStatus(Status.SUCCESS));
//         } else { // if not exist in frontend then search in backend.
//                     try {
//             const response = await axios.get("http://localhost:3000/api/product/single-product/"+id)
//             if(response.status === 200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(setProduct(response.data.data.length > 0 && response.data.data[0]))
//             }
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(Status.ERROR))

//         }
//         }
//     }
// }

export function fetchSingleProduct(id: string) {
  return async function fetchSingleProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState,
  ) {
    try {
      dispatch(setStatus(Status.LOADING));

      const store = getState();

      const productExist = store.product.products.find(
        (product) => product.id === id,
      );

      if (productExist) {
        dispatch(setSelectedProduct(productExist));
        dispatch(setStatus(Status.SUCCESS));
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/product/single-product/${id}`,
      );

      if (response.status === 200) {
        dispatch(setSelectedProduct(response.data.data?.[0] || null));

        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
