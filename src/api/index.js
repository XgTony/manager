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
            // mock:true
        })
    }
}