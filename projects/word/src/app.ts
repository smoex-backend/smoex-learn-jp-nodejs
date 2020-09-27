import { createServer } from '@smoex-nodejs/server'
import { userRouter }  from './routers/users'
import tests  from './routers'
import { Context, Next } from 'koa'
import { wordRouter } from './routers/word'
// import { sqlMapper } from './'
// sqlMapper()
// const devRemotePaths = {
//     web: '../web/build',
//     mobile: '../mobile/build',
    
//     admin: '../admin/build',
// }


const devRemotePaths = {
   '/': {
     web: '../web/build',
     mobile: '../mobile/build',
   },
   '/admin': '../admin/build',
}

const prodRemotePaths = {
    web: '/master-web',
    mobile: '/master-mobile',
    admin: '/master-admin',
}

const configure = async (ctx: Context, next: Next) => {
    const isProd = process.env.NODE_ENV === 'production' 
    ctx.config.remotePaths = isProd ? prodRemotePaths : devRemotePaths
    await next()
}

const routers = [userRouter, tests, wordRouter]
const middlewares = { 
    // configure, 
    // static: staticProxy(),
}

export default createServer({ routers, middlewares })

