import { PoolConnectionProxy, getConnection } from '../temp/dao/test'
import mysql from 'mysql'

export * from './base'
export * from './dao'

export type IBaseSqls = {
    select?: string,
}

export type IPaginationQuery = {
    page: number,
    size: number,
}