import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    monthlySalesRecord: [],
    subscriptionCount: 0
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const response = await axiosInstance.get('/payments/razorpaykey')
        return response.data
    } catch (error) {
        toast.error('Failed to load data')
    }
})

export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse', async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'error in purchaseCourseBundle')
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'error in verifyUserPayment')
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payment records"
        })
        return (await response).data;
    } catch(error) {
        toast.error("Operation failed");
    }
});


const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled, (state, action) =>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            state.isPaymentVerified = action?.payload?.success;
            toast.success(action?.payload?.message);
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            state.isPaymentVerified = action?.payload?.success;
            toast.success(action?.payload?.message);
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            state.subscriptionCount = action?.payload?.subscriptionCount;
        })
    }
})

export default razorpaySlice.reducer;