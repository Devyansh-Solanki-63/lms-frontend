import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try{
        const promise = axiosInstance.post('user/register', data) // axios promise
        toast.promise(promise, {
            loading: "Wait! creating your account",
            success: (res) => res?.data?.message, // axios promise after resolved
            error: "Failed to create account"
        })
        return (await promise).data;
        // The actual API data/response exists in axios object's data property.
        // here "await promise" is axios object and in .data API's response exists.
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const loginUser = createAsyncThunk('/auth/login', async (data) => {
    try{
        const promise = axiosInstance.post('user/login', data) // axios promise
        toast.promise(promise, {
            loading: "Wait! logging you in",
            success: (res) => res?.data?.message, // axios promise after resolved
            error: "Failed to login"
        })
        return (await promise).data;
        // The actual API data/response exists in axios object's data property.
        // here "await promise" is axios object and in .data API's response exists.
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    try{
        const promise = axiosInstance.get('user/logout') // axios promise
        toast.promise(promise, {
            loading: "Wait! logout in progress",
            success: (res) => res?.data?.message, // axios promise after resolved
            error: "Failed to logout"
        })
        return (await promise).data;
        // The actual API data/response exists in axios object's data property.
        // here "await promise" is axios object and in .data API's response exists.
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
    try{
        const promise = axiosInstance.put(`user/update-profile`, data) // axios promise
        toast.promise(promise, {
            loading: "Wait! profile update in progress",
            success: (res) => res?.data?.message, // axios promise after resolved
            error: "Failed to update profile"
        })
        return (await promise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getUserData = createAsyncThunk('/user/profile', async () => {
    try {
        const promise = axiosInstance.get('user/profile')
        return (await promise).data;
    } catch (error) {
        toast.error(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                localStorage.setItem('role', action?.payload?.user?.role)
                localStorage.setItem('isLoggedIn', true)
                state.data = action?.payload?.user
                state.role = action?.payload?.user?.role
                state.isLoggedIn = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                localStorage.clear()
                state.data = {}
                state.role = ""
                state.isLoggedIn = false
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                localStorage.setItem('role', action?.payload?.user?.role)
                localStorage.setItem('isLoggedIn', true)
                state.data = action?.payload?.user
                state.role = action?.payload?.user?.role
                state.isLoggedIn = true
            })
    }
})

export const {} = authSlice.actions
export default authSlice.reducer