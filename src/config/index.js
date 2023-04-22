/* 
*    环境配置封装
*/
// 环境变量
const env = import.meta.env.MODE || 'production'
const EnvConfig = {
    development: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/ed148014aae7cfb08161c366561fada6/api'
    },
    test: {
        baseApi: '//test.baidu.com/api',
        mockApi: 'https://www.fastmock.site/mock/ed148014aae7cfb08161c366561fada6/api'
    },
    prod: {
        baseApi: '//baidu.com/api',
        mockApi: 'https://www.fastmock.site/mock/ed148014aae7cfb08161c366561fada6/api'
    }
}
export default {
    env,
    mock: true,
    namespace:'manager',
    ...EnvConfig[env]
}