import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history, fetchWrapper } from '../_helpers';

const entityName = 'plans';  // Changed
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState = {
    plan: null,  // Changed
    plans: null,  // Changed
    isLoading: false,
    error: null
};

const getPlans = createAsyncThunk(`${entityName}/getPlans`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/plans`);  // Changed
});

const getPlanByProjectId = createAsyncThunk(`${entityName}/getPlanByProjectId`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/plans?project_id=${id}`);  // Changed
});

const getPlanById = createAsyncThunk(`${entityName}/getPlanById`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/plans/${id}`);  // Changed
});

const createPlan = createAsyncThunk(`${entityName}/createPlan`, async (plan) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/plans`, plan);  // Changed
});

const deletePlan = createAsyncThunk(`${entityName}/deletePlan`, async ({ id }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/plans/${id}`);  // Changed
});

const updatePlan = createAsyncThunk(`${entityName}/updatePlan`, async (plan) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/plans`, plan);  // Changed
});

const planSlice = createSlice({
    name: entityName,
    initialState,
    reducers: {
        clearPlans: (state) => {  // Changed
            state.plan = null;  // Changed
            localStorage.removeItem('sm-plans');  // Changed
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.plans = action.payload;
                state.error = null;
            })
    },
});

export const { clearPlans } = planSlice.actions;  // Changed
export const planActions = {
    getPlans,
    getPlanById,
    getPlanByProjectId,
    createPlan,
    deletePlan,
    updatePlan,
};
export const planReducer = planSlice.reducer;
