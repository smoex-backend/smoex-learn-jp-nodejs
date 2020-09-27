import { wordDao, IWordModel } from '../mappers/word'

const x = {
  text: 'xxx',
  kana: '',

  types: [
    '',
  ]
}

export const wordService = {
  async create(data: any) {
    return await wordDao.create(data)
  },
  async findAll() {
    return await wordDao.findAll()
  }
}

export const userService = {
    async getData() {
      return await wordDao.findAll()
    },
}
  
  