import {DataClient} from '../index'
import SubscriptionPlanController , {Controller} from './SubscriptionPlanController'
import {GetInput} from "./SubscriptionPlanData";


export const get = (plans: Controller) => async (input: GetInput) => {
    return plans.get(input)
}

export const getAll = (plans: Controller) => async (input: GetInput) => {
    return plans.getAll(input)
}

export const update = (plans: Controller) => async (input: GetInput) => {
    return plans.update(input)
}

export const insert = (plans: Controller) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deletePlan = (plans: Controller) => async (input: GetInput) => {
    return plans.deletePlan(input)
}

export async function create (data: DataClient) {
    const plans = await SubscriptionPlanController.create(data)

    return {
        get: get(plans),
        getAll: getAll(plans),
        update: update(plans),
        insert: insert(plans),
        deletePlan: deletePlan(plans)
    }
}

export default {create}