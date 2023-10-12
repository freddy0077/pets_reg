/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
// import {Database} from '../../config'

export interface Subscription {
  id?: string
  user_id?: string
  pet_id?: string
  plan_id?: string | null
  promo_code_id?: string
  start_date?: string
  end_date?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deletePlan: ReturnType<typeof deletePlan>,
}

export interface GetInput {
  id?: string
  user_id?: string
  pet_id?: string
  plan_id?: string|null
  promo_code_id?: string
  start_date?: string
  end_date?: string

}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {

  const qb = queryBuilder().select('user_subscriptions.*')
      .from('user_subscriptions')
      .where(input)

  return qb.orderBy("created_at", "DESC").first()
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
    throw new Error("An ID must be provided to update a subscription.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deletePlan = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a subscription.");
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
    deletePlan:    deletePlan(plans),
  }
}

export default {create}