import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import axios from "axios";
import type { AppDispatch } from "./store";


interface IUser {
  username: string | null;
  email: string | null;
  password: string | null;
  token?: string | null;
}

interface ILogin {
  email: string;
  password: string;
}

interface IForgetPassword {
  email: string;
}

interface IAuthState {
  user: IUser;
  status: string;
}

const initialState: IAuthState = {
  user: {
    username: "",
    email: "",
    password: "",
    token: "",
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});

export const { setUser, setStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

//asynchronous thunk
export function registerUser(data: IUser) {
  // data is come from the frontend (espically register page)
  return async function registerUserThunk(dispatch: AppDispatch) {
    //dispatch is used to update redux state (i.e inialstate value)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
      );
      console.log(response);

      //success status (recommended)
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(data)); // patha ko data lai lagera set gagreko----frontend bata
        dispatch(setUser(response.data.data)); //patha ko data lai lagera set gareko -----> backend bata
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function loginUser(data: ILogin) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        //token set in local storage
        // response.data.token && localStorage.setItem("tokenHoYo", response.data.token) /**
        if (response.data.token) {
          localStorage.setItem("tokenHoYo", response.data.token);
          dispatch(setToken(response.data.token));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function forgetPassword(data: IForgetPassword) {
  return async function forgetPasswordThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forget-password",
        data,
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
