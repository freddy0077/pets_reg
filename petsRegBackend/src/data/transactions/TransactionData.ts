/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
// import {Database} from '../../config'

export interface Transaction {
  id?: string
  subscription_id?: string
  payment_method?: string
  amount?: number
  date?: string
  status?: string
  reference?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteTransaction: ReturnType<typeof deleteTransaction>,
}

export interface GetInput {
  id?: string
  subscription_id?: string
  payment_method?: string
  amount?: string | null
  date?: string
  status?: string
  reference?: string
}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {

  const qb = queryBuilder().select('user_subscriptions.*')
      .from('user_subscriptions')
      .where(input)

  return qb.first()
}

export const getAll = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  queryBuilder().select().where(input).orderBy("created_at", "desc")
}

export const insert = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  (await queryBuilder().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a transaction.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteTransaction = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a transaction.");
  }

  return (await queryBuilder().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const plans = () => data.postgres.table('user_subscriptions')

  return {
    get:           get(plans),
    getAll:        getAll(plans),
    update:        update(plans),
    insert:        insert(plans),
    deleteTransaction:  deleteTransaction(plans),
  }
}

export default {create}