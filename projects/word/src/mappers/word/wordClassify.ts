import { BaseMapper, IBaseModel } from '@smoex-nodejs/mysql'

export type IWordClassifyModel = IBaseModel & {
    name: string,
    explain: string,
}

const SELECT_IDS_BY_WORDID_SQL = 'SELECT `word_classify_id` as `sid` from `word_classify_list` WHERE `word_id` = ? LIMIT 20'
const INSERT_IDS_BY_WORDID_SQL = 'INSERT INTO `word_classify_list`(`word_id`, `word_classify_id`) VALUES(?, ?)'

class WordClassifyDao extends BaseMapper<IWordClassifyModel> {
    constructor() {
        super('word_classify', [
            { name: 'name', editable: true },
            { name: 'explain', editable: true },
        ])
    }

    // public async getIdByText(classify: string) {
    //     const suffixRow = await this.getByQuery({ text: classify })
    //     if (!suffixRow) {
    //         throw 'can not found suffix: ' + classify
    //     }
    //     return suffixRow.id
    // }
    public async findByWordId(id: number) {
        const conn = await this.getConnection()
        const rows = await conn.query(SELECT_IDS_BY_WORDID_SQL, [id])
        const list = await this.findByIds(rows.map((row: any) => row.sid))
        return list as any[]
    }
    public async createByWordId(wordId: number, classify: any) {
        const conn = await this.getConnection()
        const row = await this.getByQuery({ text: classify })
        if (!row) {
            throw 'can not found suffix: ' + classify
        }
        await conn.query(INSERT_IDS_BY_WORDID_SQL, [wordId, row.id])
    }
}

export const wordClassifyDao = new WordClassifyDao()
