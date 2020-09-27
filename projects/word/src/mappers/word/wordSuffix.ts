import { BaseMapper, IBaseModel } from '@smoex-nodejs/mysql'

export type IWordSuffixModel = IBaseModel & {
    text: string,
    explain: string,
    typeId: number,
}

const SELECT_IDS_BY_WORDID_SQL = 'SELECT `word_suffix_id` as `sid` from `word_suffix_list` WHERE `word_id` = ? LIMIT 20'
const INSERT_IDS_BY_WORDID_SQL = 'INSERT INTO `word_suffix_list`(`word_id`, `word_suffix_id`) VALUES(?, ?)'

class WordSuffixDao extends BaseMapper<IWordSuffixModel> {
    constructor() {
        super('word_suffix', [
            { name: 'text', editable: true },
            { name: 'explain', editable: true },
            { name: 'typeId', column: 'word_type_id', editable: true },
        ])
    }
    // public async getIdByText(suffix: string) {
    //     const suffixRow = await wordSuffixDao.getByQuery({ text: suffix })
    //     if (!suffixRow) {
    //         throw 'can not found suffix: ' + suffix
    //     }
    //     return suffixRow.id
    // }
    public async findByWordId(id: number) {
        const conn = await this.getConnection()
        const rows = await conn.query(SELECT_IDS_BY_WORDID_SQL, [id])
        const list = await this.findByIds(rows.map((row: any) => row.sid))
        return list as any[]
    }
    public async createByWordId(wordId: number, suffixs: Partial<IWordSuffixModel>[]) {
        const conn = await this.getConnection()
        const rows = await super.findByQuery({ 
            text: suffixs.map(s => s.text),
            typeId: suffixs.map(s => s.typeId), 
        })
        if (rows.length !== suffixs.length) {
            throw { code: 1, message: 'can not found all suffixs' }
        }
        for (const row of rows) {
            await conn.query(INSERT_IDS_BY_WORDID_SQL, [wordId, row.id])
        }
    }
}

export const wordSuffixDao = new WordSuffixDao()
