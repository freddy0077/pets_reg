import PetData , {Data, GetInput} from './PetData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deletePet: ReturnType<typeof deletePet>,
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

export const deletePet = (users: Data) => async (input: GetInput) => {
    return users.deletePet(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await PetData.create(data)

    return {
        get:        get(users),
        getAll:     getAll(users),
        update:     update(users),
        insert:     insert(users),
        deletePet: deletePet(users),
    }
}

export default {create}