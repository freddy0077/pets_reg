/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
// import {Database} from '../../config'

export interface User {
  id: string
  email?: string
  username?: string
  password?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  secondary_phone_number?: string
  address?: string
  location?: string
  role?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteUser: ReturnType<typeof deleteUser>,
}

export interface GetInput {
  id?: string
  email?: string
  username?: string
  password?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  secondary_phone_number?: string
  address?: string
  location?: string
  role?: string
}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {

  const qb = queryBuilder().select('users.*')
      .from('users')
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
    throw new Error("An ID must be provided to update a user.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteUser = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a user.");
  }

  return (await queryBuilder().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  // const users = () => data.postgres.withSchema(Database.schema).table('User')
  const users = () => data.postgres.table('users')

  return {
    get:           get(users),
    getAll:        getAll(users),
    update:        update(users),
    insert:        insert(users),
    deleteUser:    deleteUser(users),
  }
}

export default {create}