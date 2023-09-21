/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
// import {Database} from '../../config'

export interface Pet {
  id?: string
  pet_name?: string
  dob?: string
  sex?: string
  pet_type?: string
  breed?: string
  special_mark?: string
  age?: string
  color?: string
  weight?: string
  microchip_number?: string
  special_notes?: string
  profile_picture_url?: string
  user_id?: string
  created_at?: string
  updated_at?: string
  terms_accepted?: boolean
  active?: boolean
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deletePet: ReturnType<typeof deletePet>,
}

export interface GetInput {
  id?: string
  pet_name?: string
  dob?: string
  sex?: string
  pet_type?: string
  breed?: string
  special_mark?: string
  age?: string
  color?: string
  weight?: string
  microchip_number?: string
  special_notes?: string
  profile_picture_url?: string
  user_id?: string
  created_at?: string
  updated_at?: string
  terms_accepted?: boolean
  active?: boolean
}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {

  const qb = queryBuilder().select('pets.*')
      .from('pets')
      .where(input)

  return qb.first()
}

export const getAll = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  queryBuilder().select().where(input)
}

export const insert = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  (await queryBuilder().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a pet.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deletePet = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a pet.");
  }

  return (await queryBuilder().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  // const users = () => data.postgres.withSchema(Database.schema).table('User')
  const pets = () => data.postgres.table('pets')

  return {
    get:           get(pets),
    getAll:        getAll(pets),
    update:        update(pets),
    insert:        insert(pets),
    deletePet:    deletePet(pets),
  }
}

export default {create}