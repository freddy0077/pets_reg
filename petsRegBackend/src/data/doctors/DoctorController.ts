import DoctorData , {Data, GetInput} from './DoctorData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteDoctor: ReturnType<typeof deleteDoctor>,
}

export const get = (users: Data) => async (input: GetInput) => {
    return users.get(input)
}

export const getAll = (users: Data) => async (input: GetInput) => {
    return users.getAll(input)
}

export const update = (users: Data) => async (input: GetInput) => {
    return users.update(input)
}

export const insert = (plans: Data) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deleteDoctor = (users: Data) => async (input: GetInput) => {
    return users.deleteDoctor(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await DoctorData.create(data)

    return {
        get:        get(users),
        getAll:     getAll(users),
        update:     update(users),
        insert:     insert(users),
        deleteDoctor: deleteDoctor(users),
    }
}

export default {create}