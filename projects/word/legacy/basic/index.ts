
import app from './base'
import { 
    initialize,
    normalizeData,
    normalizeError,
    vaildateParams,
    afterConfigure,
} from './middewares'
import Router from 'koa-router'
// import { Config } from 'http-proxy-middleware';
// import baseRouter from './router'

// type IGlobalConfig = {
//     staticPath?: string,
//     ssrModulePath?: string,
//     excludeStaticPaths?: string[],
// }

// export type IHttpProxyConfig = Record<string, Config>

type IServerConfigure = {
    routers?: Router[],
    middlewares?: any,
}

// const defaultHttpProxy: IHttpProxyConfig = {
//     '/api/(.*)': {
//         changeOrigin: true,
//         target: 'http://gateway.smoex.com',
//     },
// }

export const createServer = (config: IServerConfigure = {}) => {
    const {
        routers = [],
        middlewares = {},
    } = config

    app.use(initialize)

    const { 
        configure, 
        static: staticProxy,
    } = middlewares

    if (configure) {
        app.use(configure)
        app.use(afterConfigure)
    }
    app.use(normalizeError)

    if (staticProxy) {
        app.use(staticProxy)
    }

    app.use(normalizeData)
    app.use(vaildateParams)

    routers.forEach(router => {
        app.use(router.routes())
        app.use(router.allowedMethods())
    })

    // const proxies = { ...defaultHttpProxy, ...httpProxy }
    // app.use(requestProxy(proxies))

    // app.use(baseRouter.routes())
    // app.use(baseRouter.allowedMethods())

    return app
}
