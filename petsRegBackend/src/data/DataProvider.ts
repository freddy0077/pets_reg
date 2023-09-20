import Knex from 'knex'
import {Redis} from 'ioredis'

import MysqlProvider from './MysqlProvider'
import RedisProvider from './RedisProvider'

export interface DataClient {
  postgres: Knex,
  redis: Redis,
}

export async function create (): Promise<DataClient> {
  return {
    postgres: await MysqlProvider.create(),
    redis: await RedisProvider.create(),
  }
}

export default {create}