import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history, fetchWrapper } from '../_helpers';

const entityName = 'doctors';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState = {
    doctor: null,
    doctors: null,
    isLoading: false,
    error: null
};

const getDoctors = createAsyncThunk(`${entityName}/getDoctors`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/doctors`);
});

const getDoctorByProjectId = createAsyncThunk(`${entityName}/getDoctorByProjectId`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/doctors?project_id=${id}`);
});

const getDoctorById = createAsyncThunk(`${entityName}/getDoctorById`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/doctors/${id}`);
});

const createDoctor = createAsyncThunk(`${entityName}/createDoctor`, async (doctor) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/doctors`, doctor);
});

const deleteDoctor = createAsyncThunk(`${entityName}/deleteDoctor`, async ({ id }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/doctors/${id}`);
});

const updateDoctor = createAsyncThunk(`${entityName}/updateDoctor`, async (doctor) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/doctors`, doctor);
});

const doctorSlice = createSlice({
    name: entityName,
    initialState,
    reducers: {
        clearDoctors: (state) => {
            state.doctor = null;
            localStorage.removeItem('sm-doctors');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors = action.payload;
                state.error = null;
            })
            .addCase(getDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getDoctors.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(getDoctorByProjectId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors = action.payload;
                state.error = null;
            })
            .addCase(getDoctorByProjectId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getDoctorByProjectId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(getDoctorById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctor = action.payload;
                state.error = null;
            })
            .addCase(getDoctorById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getDoctorById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.doctor = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createDoctor.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(createDoctor.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.doctor = action.payload;
                state.error = null;
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.doctor = action.payload;
                state.error = null;
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearDoctors } = doctorSlice.actions;
export const doctorActions = {
    getDoctors,
    getDoctorById,
    getDoctorByProjectId,
    createDoctor,
    deleteDoctor,
    updateDoctor,
};
export const doctorReducer = doctorSlice.reducer;
