import axios from 'axios';
import md5 from 'js-md5';
/** 需要先登录再访问的路由 */
let api = 'api';

/** 不需要登录就能访问的路由 */
let base = 'base';

/**
 * 注册
 */
export const req_register = (user) => { 
    return axios.post(api, {
		type:user.type,
        email:user.email,
		sid:user.sid,
        password:user.password
    },{
		headers:{
			'method':'register'
		}
	}).then(res => res.data); 
};
/**
 * 修改个人信息
 */
export const req_updateUserInfo = (user) => { 
    return axios.put(api, {
		id:user.id,
		firstName:user.firstName,
		lastName:user.lastName,
		avatarId:user.avatarId
    },{
		headers:{
			'method':'userInfo'
		}
	}).then(res => res.data); 
};
/**
 * 登录接口
 * @param {用户名、手机号、邮箱} userName 
 * @param {密码} password 
 */
export const req_logon = (userName,password) => { 
    return axios.post(`${base}/logon`, {
        userName:userName,
        password:password
    }).then(res => res.data); 
};
