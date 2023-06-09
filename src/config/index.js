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
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/ed148014aae7cfb08161c366561fada6/api'
    },
    production: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/ed148014aae7cfb08161c366561fada6/api'
    }
}
export default {
    env,
    mock: false,
    namespace:'manager',
    ...EnvConfig[env]
}