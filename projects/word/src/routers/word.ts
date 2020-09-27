import Router from 'koa-router'
import { wordService } from '../services/word'
import { wordClassifyDao } from '../mappers/word'

const router = new Router()

router.get('/word', async (ctx) => {
    const words = await wordService.findAll()
    ctx.body = words
})

router.post('/word/create', async (ctx) => {
    const{ classify, ...word } = ctx.request.body
    const wordId = await wordService.create(word)
    if (classify) {
        await wordClassifyDao.createByWordId(wordId, classify)
    }
    ctx.body = { code: 0 }
})

export { router as wordRouter }