import Router from 'koa-router'
import { Context } from 'koa'
import { wordService } from '../services/word'

const router = new Router()
router.prefix('/api/account')

router.get('/', getAll)
router.get('/infox', getInfo)


async function getAll(ctx: Context) {
  ctx.body = 'xxxxxx'
}

async function getInfo(ctx: Context) {
  const data = {
    text: '暗算',
    kana: 'あんざん',
    accent: 0,
    types: ['他動', '名', 'サ変.する'],
  }
  const suffixs = {
    text: '',
    explain: '',
    typeId: 0,
  }

  const word = {
    basic: {},
    blocks: [{
      suffix: 'する',
      types: ['他動', 'サ変'],
    }, {
      suffix: 'だ',
      types: ['形動'],
    }]
  }
  const data2 = {}
  ctx.body = { code: 123, data: await wordService.findAll() }
}

export { router as userRouter }
//　病む｜やむ　1　が
//　適応｜てきおう　0　が｜ー｜する
//　極端｜きょくたん　2　だ｜ー
//　易｜やす　2　い


