import { BaseMapper, IBaseModel } from '@smoex-nodejs/mysql'

export type IWordTypeModel = IBaseModel & {
    name: string,
    explain?: string,
}

const SELECT_IDS_BY_WORDID_SQL = 'SELECT `word_type_id` as `tid` from `word_type_list` WHERE `word_id` = ? LIMIT 20'
const INSERT_IDS_BY_WORDID_SQL = 'INSERT INTO `word_type_list`(`word_id`, `word_type_id`) VALUES(?, ?)'

class WordTypeDao extends BaseMapper<IWordTypeModel> {
    constructor() {
        super('word_type', [
            { name: 'name', editable: true },
            { name: 'explain', editable: true },
        ])
    }
    public async findByWordId(id: number) {
        const conn = await this.getConnection()
        const rows = await conn.query(SELECT_IDS_BY_WORDID_SQL, [id])
        const list = await this.findByIds(rows.map((row: any) => row.tid))
        return list as any[]
    }
    public async createByWordId(wordId: number, types: string[]) {
        const conn = await this.getConnection()
        const rows = await super.findByQuery({ name: types })
        if (rows.length !== types.length) {
            throw { code: 1, message: 'can not found all types' }
        }
        for (const row of rows) {
            await conn.query(INSERT_IDS_BY_WORDID_SQL, [wordId, row.id])
        }
        return rows
    }
}

export const wordTypeDao = new WordTypeDao()
