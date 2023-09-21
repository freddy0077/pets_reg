import {DataClient} from '../index'
import UserController, {Controller} from './OtpLoginController'
import {GetInput} from "./OtpLoginData";


export const get = (otp: Controller) => async (input: GetInput) => {
    return otp.get(input)
}

export const getAll = (otp: Controller) => async (input: GetInput) => {
    return otp.getAll(input)
}

export const update = (otp: Controller) => async (input: GetInput) => {
    return otp.update(input)
}

export const insert = (otp: Controller) => async (input: GetInput) => {
    return otp.insert(input)
}

export const deleteUser = (otp: Controller) => async (input: GetInput) => {
    return otp.deleteOtp(input)
}

export async function create (data: DataClient) {
    const otp = await UserController.create(data)

    return {
        get: get(otp),
        getAll: getAll(otp),
        update: update(otp),
        insert: insert(otp),
        deleteUser: deleteUser(otp)
    }
}

export default {create}