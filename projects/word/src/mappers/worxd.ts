import { BaseMapper, IBaseModel } from '@smoex-nodejs/mysql'


export type IWordModel = IBaseModel & {
    text: string,
    kana?: string,
    source?: string,
}

export type IWordSuffixModel = & {
    text: string,
    explain?: string,
}

export type IWordTypeModel = & {
    name: string,
    explain?: string,
}

class WordDao extends BaseMapper<IWordModel> {
    constructor() {
        super('word', [
            { name: 'text', editable: true },
            { name: 'kana', editable: true },
            { name: 'source', editable: true },
        ])
    }
}

// class WordTypeDao extends BaseDao<IWordModel> {
//     constructor() {
//         super('word_type', [
//             { name: 'text', editable: true },
//             { name: 'kana', editable: true },
//             // { name: 'meaning', editable: true },
//         ])
//     }
// }

// class WordTypeListDao extends BaseDao<IWordModel> {
//     constructor() {
//         super('word_type', [
//             { name: 'text', editable: true },
//             { name: 'kana', editable: true },
//             { name: 'meaning', editable: true },
//         ])
//     }
// }

// class WordSuffixDao extends BaseDao<IWordModel> {
//     constructor() {
//         super('word', [
//             { name: 'text', editable: true },
//             { name: 'kana', editable: true },
//             { name: 'meaning', editable: true },
//         ])
//     }
//     findByWordId(id: number) {
//         const conn = this.getConnection()
//     }
// }

// export const wordDao = new WordDao()
// export const wordTypeDao = new WordTypeDao()
// export const wordTypeListDao = new WordTypeListDao()
// export const wordSuffixDao = new WordSuffixDao()
