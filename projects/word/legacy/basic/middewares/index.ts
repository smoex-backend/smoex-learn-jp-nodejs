export * from './normalize'
export * from './proxy'
export * from './vaildate'

import { Context, Next } from 'koa'

export const initialize = async (ctx: Context, next: Next) => {
    ctx.config = {}
    await next()
 }
 
export const afterConfigure = async (ctx: Context, next: Next) => {
     const { remotePaths = {} } = ctx.config
     const ua = ctx.header['user-agent']
     const isMobile = /AppleWebKit.*Mobile.*/i.test(ua)
     ctx.config.staticPath = isMobile ? remotePaths["/"].mobile : remotePaths["/"].web
  
     for (const path of Object.keys(remotePaths)) {
         const remotePath = remotePaths[path]
         if (path !== '/' && ctx.url.startsWith(path)) {
             if (typeof remotePath === 'string') {
                 ctx.config.staticPath = remotePath
             } else {
                 ctx.config.staticPath = isMobile ? remotePath.mobile : remotePath.web
             }
         }
     }
     await next()
 }
 