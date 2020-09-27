import { BaseMapper, IBaseModel } from '@smoex-nodejs/mysql'
import { wordTypeDao, IWordTypeModel } from './wordType'
import { wordSuffixDao, IWordSuffixModel } from './wordSuffix'

export type IWordModel = IBaseModel & {
    text: string,
    accent: string,
    kana?: string,
    source?: string,
    types?: IWordTypeModel[],
}

export type IWordData = Partial<IWordModel> & {
    types: string[],
}

class WordDao extends BaseMapper<IWordModel> {
    constructor() {
        super('word', [
            { name: 'text', editable: true },
            { name: 'kana', editable: true },
            // { name: 'accent', editable: true },
            // { name: 'source', editable: true },
        ])
    }
    public async findAll(query?: any, pageQuery?: any) {
        const data = await super.findAll(query, pageQuery)
        data.list = await Promise.all(data.list.map(async item => {
            const [suffixs, types] = await Promise.all([
                wordSuffixDao.findByWordId(item.id),
                wordTypeDao.findByWordId(item.id)
            ])
            return { ...item, suffixs, types }
        }))
        return data
    }

    public async create(data: IWordData) {
        const conn = await this.getConnection()
        const word = await super.getByQuery({ text: data.text, kana: data.kana })
        if (word) {
            throw { message: 'the word is exists: ' + word.id }
        }
        let wordId: number
        await conn.beginTransaction()
        try {
            const { types: formatedTypes, ...word } = data
            const types = formatedTypes.map((type: string) => type.split('.')[0])
            wordId = await super.create(word)
            const typeRows = await wordTypeDao.createByWordId(wordId, types)
            const suffixs = this.mapSuffixs(formatedTypes, typeRows)
            await wordSuffixDao.createByWordId(wordId, suffixs)
            await conn.commit()

        } catch (err) {
            await conn.rollback()
            console.log(err)
            throw err
        }
        conn.release()
        return wordId
    }

    private mapSuffixs(types: string[], typeRows: IWordTypeModel[]) {
        return types.map((type: string) => {
            const [typeName, suffix] = type.split('.')
            if (!suffix) {
                return undefined
            }
            const typeRow = typeRows.find(row => row.name === typeName)
            if (!typeRow) {
                throw { message: 'can not found type row' }
            }
            return { typeId: typeRow.id, text: suffix }
        }).filter(Boolean) as IWordSuffixModel[]
    }
}

export const wordDao = new WordDao()
