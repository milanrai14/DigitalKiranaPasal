import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch } from "./store";
// import { RootState } from "@reduxjs/toolkit/query";
// RootState vaneko store bata aauney ho...@reduxjs/toolkit/query bata haina
import type { RootState } from "./store";


//Yesko type store ma k aauxa tei diney ho
export const useAppDispatch =useDispatch.withTypes<AppDispatch>(); 
//useAppDispatch = useDispatch + type

export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector