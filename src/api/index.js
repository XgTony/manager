/**
 * api管理
 * @author ljw
 * 
 */
import request from "../utils/request"
export default {
    login(params) {
        return request({
            method: 'post',
            url: '/users/login',
            data: params,
            mock: false
        })
    },
    noticeCount(params) {
        return request({
            method: 'get',
            url: '/leave/count',
            data: params,
            mock: true
        })
    },
    getMenuList(params) {
        return request({
            method: 'get',
            url: '/menu/list',
            data: params,
            mock: true
        })
    },
    getUserList(params) {
        return request({
            method: 'get',
            url: '/users/list',
            data: params,
            mock: true
        })
    },
    deleteUser(params) {
        return request({
            method: 'post',
            url: '/users/delete',
            data: params,
            mock: true
        })
    },
    getRoleList(params) {
        return request({
            method: 'get',
            url: '/roles/allList',
            data: params,
            mock: true
        })
    },
    getDeptList(params) {
        return request({
            method: 'get',
            url: '/dept/list',
            data: params,
            mock: true
        })
    },
    userSubmit(params) {
        return request({
            method: 'post',
            url: '/users/operate',
            data: params,
            mock: true
        })
    },
    menuSubmit(params) {
        return request({
            method: 'post',
            url: '/menu/operate',
            data: params,
            mock: true
        })
    },
}