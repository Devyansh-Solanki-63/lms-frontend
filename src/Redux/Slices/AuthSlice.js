import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try{
        const promise = axiosInstance.post('user/register', data)
        toast.promise(promise, {
            loading: "Wait! creating your account",
            success: (res) => res?.data?.message,
            error: "Failed to create account"
        })
        return (await promise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export const {} = authSlice.actions
export default authSlice.reducer