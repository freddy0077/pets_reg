import OtpLoginData , {Data, GetInput} from './OtpLoginData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteOtp: ReturnType<typeof deleteOtp>,
}

export const get = (otp: Data) => async (input: GetInput) => {
    return otp.get(input)
}

export const getAll = (otp: Data) => async (input: GetInput) => {
    return otp.getAll(input)
}

export const update = (otp: Data) => async (input: GetInput) => {
    return otp.update(input)
}

export const insert = (otp: Data) => async (input: GetInput) => {
    return otp.insert(input)
}

export const deleteOtp = (otp: Data) => async (input: GetInput) => {
    return otp.deleteOtp(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const otp = await OtpLoginData.create(data)

    return {
        get:        get(otp),
        getAll:     getAll(otp),
        update:     update(otp),
        insert:     insert(otp),
        deleteOtp:  deleteOtp(otp),
    }
}

export default {create}