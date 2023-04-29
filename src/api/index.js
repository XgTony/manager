/**
 * api管理
 * @author ljw
 * 
 */
import request from "../utils/request"
export default {
    login(params){
        return request({
            method:'post',
            url: '/users/login',
            data: params,
            mock:false
        })
    },
    noticeCount(params){
        return request({
            method:'get',
            url: '/leave/count',
            data: params,
            mock:true
        })
    },
    getMenuList(params){
        return request({
            method:'get',
            url: '/menu/list',
            data: params,
            mock:true
        })
    },
    getUserList(params){
        return request({
            method:'get',
            url: '/users/list',
            data: params,
            mock:true
        })
    },
}