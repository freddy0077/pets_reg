import {DataClient} from '../index'
import UserController, {Controller} from './PetController'
import {GetInput} from "./PetData";


export const get = (pets: Controller) => async (input: GetInput) => {
    return pets.get(input)
}

export const getAll = (pets: Controller) => async (input: GetInput) => {
    return pets.getAll(input)
}

export const update = (pets: Controller) => async (input: GetInput) => {
    return pets.update(input)
}

export const insert = (pets: Controller) => async (input: GetInput) => {
    return pets.insert(input)
}

export const deletePet = (pets: Controller) => async (input: GetInput) => {
    return pets.deletePet(input)
}

export async function create (data: DataClient) {
    const pets = await UserController.create(data)

    return {
        get: get(pets),
        getAll: getAll(pets),
        update: update(pets),
        insert: insert(pets),
        deletePet: deletePet(pets)
    }
}

export default {create}