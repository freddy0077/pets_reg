import SubscriptionPlanData , {Data, GetInput} from './SubscriptionPlanData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deletePlan: ReturnType<typeof deletePlan>,
}

export const get = (plans: Data) => async (input: GetInput) => {
    return plans.get(input)
}

export const getAll = (plans: Data) => async (input: GetInput) => {
    return plans.getAll(input)
}

export const update = (plans: Data) => async (input: GetInput) => {
    return plans.update(input)
}

export const insert = (plans: Data) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deletePlan = (plans: Data) => async (input: GetInput) => {
    return plans.deletePlan(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await SubscriptionPlanData.create(data)

    return {
        get:        get(users),
        getAll:     getAll(users),
        update:     update(users),
        insert:     insert(users),
        deletePlan: deletePlan(users),
    }
}

export default {create}