/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'

export interface OtpLogin {
  id?: string
  user_id?: string
  otp_code?: string
  expiration_time?: string
  used?: boolean
  channel?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteOtp: ReturnType<typeof deleteOtp>,
}

export interface GetInput {
  id?: string
  user_id?: string
  otp_code?: string
  expiration_time?: string
  used?: boolean
  channel?: string
}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  // return  queryBuilder().select().where(input).first()

  const qb = queryBuilder().select('otp_logins.*', 'users.email','users.firstName', "users.lastName", "users.phone_number")
      .leftJoin("users", "users.id","otp_logins.user_id")
      .from('otp_logins')
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
    throw new Error("An ID must be provided to update an otp.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteOtp = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete an otp.");
  }

  return (await queryBuilder().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const otp = () => data.postgres.table('otp_logins')

  return {
    get:           get(otp),
    getAll:        getAll(otp),
    update:        update(otp),
    insert:        insert(otp),
    deleteOtp:    deleteOtp(otp),
  }
}

export default {create}