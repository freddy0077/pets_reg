import { store, authActions } from '../_store';
import axios from 'axios';

// const baseUrl = process.env.REACT_APP_API_URL
const baseUrl = "http://localhost:5008"

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELETE'),
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
            body: body ? JSON.stringify(body) : undefined
        };

        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
        }

        return axios({
            method: method,
            url: url,
            data: requestOptions.body,
            headers: requestOptions.headers
        }).then(handleResponse);
    }
}

// helper functions
function authHeader(url) {
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(baseUrl);

    return { Authorization: `Bearer ${token}` };
}

function authToken() {
    return store.getState().auth.user?.token;
}

function handleResponse(response) {
    console.log("Handle response", response);
    return response && response.data;
}
