import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history, fetchWrapper } from '../_helpers';

const paymentName = 'payments';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState = {
    payment: null,
    payments: null,
    isLoading: false,
    error: null
};

const getPayments = createAsyncThunk(`${paymentName}/getPayments`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/payments`);
});


const getPaymentById = createAsyncThunk(`${paymentName}/getPaymentById`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/payments/${id}`);
});

const createPayment = createAsyncThunk(`${paymentName}/createPayment`, async (payment) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/payments`, payment);
});

const deletePayment = createAsyncThunk(`${paymentName}/deletePayment`, async ({ id }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/payments/${id}`);
});

const updatePayment = createAsyncThunk(`${paymentName}/updatePayment`, async (payment) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/payments`, payment);
});

const paymentSlice = createSlice({
    name: paymentName,
    initialState,
    reducers: {
        clearPayments: (state) => {
            state.payment = null;
            localStorage.removeItem('sm-payments');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payments = action.payload;
                state.error = null;
            })

            .addCase(createPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payment = action.payload;
                state.error = null;
            })
    },
});

export const { clearPayments } = paymentSlice.actions;
export const paymentActions = {
    getPayments,
    getPaymentById,
    createPayment,
    deletePayment,
    updatePayment,
};
export const paymentReducer = paymentSlice.reducer;
