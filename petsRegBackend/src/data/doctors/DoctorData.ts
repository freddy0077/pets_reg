/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
// import {Database} from '../../config'
export interface Doctor {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dob?: string;
  qualification?: string;
  experience?: string;
  previousWorkplace?: string;
  emergencyContact?: string;
  workAvailability?: string;
  bio?: string;
  specialization?: string;
  license?: string;
  profilePicture?: string; // URL for the profile picture
  created_at?: string;
  updated_at?: string;
}



export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteDoctor: ReturnType<typeof deleteDoctor>,
}

export interface GetInput {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dob?: string;
  qualification?: string;
  experience?: string;
  previousWorkplace?: string;
  emergencyContact?: string;
  workAvailability?: string;
  bio?: string;
  specialization?: string;
  license?: string;
  password?: string; // Please ensure that you never expose raw passwords.
  profilePicture?: string; // URL for the profile picture
  created_at?: string;
  updated_at?: string;
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

export const deleteDoctor = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a pet.");
  }

  return (await queryBuilder().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  // const users = () => data.postgres.withSchema(Database.schema).table('User')
  const pets = () => data.postgres.table('doctors')

  return {
    get:           get(pets),
    getAll:        getAll(pets),
    update:        update(pets),
    insert:        insert(pets),
    deleteDoctor:    deleteDoctor(pets),
  }
}

export default {create}