import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history, fetchWrapper } from '../_helpers';


const petName = 'pets';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState = {
    pet: null,
    pets: null,
    isLoading: false,
    error: null
};

const getPets = createAsyncThunk(`${petName}/getPets`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/pets`);
});

const getPetByProjectId = createAsyncThunk(`${petName}/getPetByProjectId`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/pets?project_id=${id}`);
});

const getPetById = createAsyncThunk(`${petName}/getPetById`, async ({ id }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/pets/${id}`);
});

const createPet = createAsyncThunk(`${petName}/createPet`, async (pet) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/pets`, pet);
});

const deletePet = createAsyncThunk(`${petName}/deletePet`, async ({ id }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/pets/${id}`);
});

const updatePet = createAsyncThunk(`${petName}/updatePet`, async (pet) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/pets`, pet);
});

const petSlice = createSlice({
    name: petName,
    initialState,
    reducers: {
        clearPets: (state) => {
            state.pet = null;
            localStorage.removeItem('sm-pets');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pets = action.payload;
                state.error = null;
            })
            .addCase(getPets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPets.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(getPetByProjectId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pets = action.payload;
                state.error = null;
            })
            .addCase(getPetByProjectId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPetByProjectId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(getPetById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pet = action.payload;
                state.error = null;
            })
            .addCase(getPetById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getPetById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(createPet.fulfilled, (state, action) => {
                state.pet = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createPet.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(createPet.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true;
            })
            .addCase(deletePet.fulfilled, (state, action) => {
                state.pet = action.payload;
                state.error = null;
            })
            .addCase(deletePet.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updatePet.fulfilled, (state, action) => {
                state.pet = action.payload;
            })
            .addCase(updatePet.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearPets } = petSlice.actions;
export const petActions = {
    getPets,
    getPetById,
    getPetByProjectId,
    createPet,
    deletePet,
    updatePet,
};
export const petReducer = petSlice.reducer;
