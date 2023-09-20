import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { history, fetchWrapper } from '../_helpers';

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        isLoading: false,
        user: JSON.parse(localStorage.getItem('sm-user') || 'null'),
        isLoggedOut: false,
        error: null,
        isAdminLoginOpen: false,
        isVerified: false
    }
}

function createReducers() {
    return {
        logout,
        setLogout,
        openAdminLogin
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('sm-user');
    }

    function openAdminLogin(state) {
        state.isAdminLoginOpen = true;
        state.error = null;
    }

    function setLogout(state, action) {
        state.isLoggedOut = action.payload;
    }

    function clearErrors(state) {
        state.error = null;
    }
}

function createExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        login: createAsyncThunk(
            `${name}/login`,
            async ({ email, password }) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/auth/login`, { email, password });
            }
        ),

        getUser: createAsyncThunk(
            `${name}/user`,
            async () => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/user`);
            }
        ),
        verifySms: createAsyncThunk(
            `${name}/verifySms`,
            async ({ code }) => {
                return await fetchWrapper.post(`${baseUrl}/auth/verify-sms`, { code });
            }
        )
    };
}

function createExtraReducers() {
    return {
        [extraActions.login.pending.toString()]: state => {
            state.error = null;
            state.isLoading = true;
        },
        [extraActions.login.fulfilled.toString()]: (state, action) => {
            const user = action.payload;
            localStorage.setItem('sm-user', JSON.stringify(user));
            state.user = user;
            state.isLoggedOut = false;
        },
        [extraActions.login.rejected.toString()]: (state, action) => {
            state.isLoading = false;

            if (action.error.message.includes("401")) {
                state.error = { message: "Username or password is incorrect!" };
                return;
            } else if (action.error.message.includes("403")) {
                state.error = { message: "Account not activated or license has expired!" };
                return;
            } else if (action.error.message.includes("400")) {
                state.error = { message: "Username and password are required!" };
                return;
            }

            state.error = action.error.message;
            console.log("error object", action);
        },

        [extraActions.verifySms.pending.toString()]: state => {
            state.error = null;
        },
        [extraActions.verifySms.fulfilled.toString()]: (state, action) => {
            state.isVerified = action.payload.verified;
        },
        [extraActions.verifySms.rejected.toString()]: (state, action) => {
            state.isVerified = false;
            state.error = action.payload;
        }
    };
}
