import SubscriptionData , {Data, GetInput} from './SubscriptionData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deletePlan: ReturnType<typeof deletePlan>,
}

export const get = (subscriptions: Data) => async (input: GetInput) => {
    return subscriptions.get(input)
}

export const getAll = (subscriptions: Data) => async (input: GetInput) => {
    return subscriptions.getAll(input)
}

export const update = (subscriptions: Data) => async (input: GetInput) => {
    return subscriptions.update(input)
}

export const insert = (subscriptions: Data) => async (input: GetInput) => {
    return subscriptions.insert(input)
}

export const deletePlan = (subscriptions: Data) => async (input: GetInput) => {
    return subscriptions.deletePlan(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await SubscriptionData.create(data)

    return {
        get:        get(users),
        getAll:     getAll(users),
        update:     update(users),
        insert:     insert(users),
        deletePlan: deletePlan(users),
    }
}

export default {create}