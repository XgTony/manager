/* 
*    环境配置封装
*/

// 获取环境变量
// 环境变量通常可以从 process.env 获得, 注意 Vite 默认是不加载 .env 文件的
// const env = import.meta.env
// 环境变量
const env = import.meta.env.MODE || 'production'
const EnvConfig = {
    development: {
        baseApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    production: {
        baseApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    }
}
export default {
    env,
    mock: true,
    namespace: 'manager',
    ...EnvConfig[env]

    // baseApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
    // mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'

}