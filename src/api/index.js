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
        })
    },
    noticeCount(params) {
        return request({
            method: 'get',
            url: '/leave/count',
            data: params,
        })
    },
    getMenuList(params) {
        return request({
            method: 'get',
            url: '/menu/list',
            data: params,
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
    getAllUserList(params) {
        return request({
            method: 'get',
            url: '/users/all/list',
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
    getRoleAllList(params) {
        return request({
            method: 'get',
            url: '/roles/allList',
            data: params,
            mock: true
        })
    },
    getRoleList(params) {
        return request({
            method: 'get',
            url: '/roles/List',
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
    roleSubmit(params) {
        return request({
            method: 'post',
            url: '/roles/operate',
            data: params,
            mock: true
        })
    },
    updatePermission(params) {
        return request({
            method: 'post',
            url: '/roles/update/permission',
            data: params,
        })
    },
    deptOperate(params) {
        return request({
            method: 'post',
            url: '/dept/operate',
            data: params,
            mock: true
        })
    },
    getApplyList(params) {
        return request({
            url: '/leave/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    leaveApprove(params) {
        return request({
            url: '/leave/approve',
            method: 'post',
            data: params,
        })
    },
    leaveOperate(params) {
        return request({
            url: '/leave/operate',
            method: 'post',
            data: params,
        })
    },
    getApplyList(params) {
        return request({
            url: '/leave/list',
            method: 'get',
            data: params,

        })
    },
}