import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { doctorReducer } from './doctors.slice';
import { petReducer } from './pets.slice';
import { paymentReducer } from './payments.slice';
import { planReducer } from './plans.slice';

export * from './auth.slice'
export * from './pets.slice'
export * from './doctors.slice'
export * from './payments.slice'
export * from './plans.slice'


// @ts-ignore
export const store = configureStore({
    reducer: {
        auth:        authReducer,
        doctor:      doctorReducer,
        pet:         petReducer,
        payment:     paymentReducer,
        plan:        planReducer
    }
})