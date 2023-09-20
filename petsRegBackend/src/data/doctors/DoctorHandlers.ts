import {DataClient} from '../index'
import DoctorController , {Controller} from './DoctorController'
import {GetInput} from "./DoctorData";


export const get = (doctors: Controller) => async (input: GetInput) => {
    return doctors.get(input)
}

export const getAll = (doctors: Controller) => async (input: GetInput) => {
    return doctors.getAll(input)
}

export const update = (doctors: Controller) => async (input: GetInput) => {
    return doctors.update(input)
}

export const insert = (doctors: Controller) => async (input: GetInput) => {
    return doctors.insert(input)
}

export const deleteDoctor = (doctors: Controller) => async (input: GetInput) => {
    return doctors.deleteDoctor(input)
}

export async function create (data: DataClient) {
    const pets = await DoctorController.create(data)

    return {
        get: get(pets),
        getAll: getAll(pets),
        update: update(pets),
        insert: insert(pets),
        deleteDoctor: deleteDoctor(pets)
    }
}

export default {create}