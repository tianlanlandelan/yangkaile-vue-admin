import axios from 'axios';
import md5 from 'js-md5';
/** 需要先登录再访问的路由 */
let api = 'api';

/** 不需要登录就能访问的路由 */
let base = 'base';
let Base64 = require('js-base64').Base64;

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
/**
 * 注册接口
 * @param {手机号或邮箱} userName 
 * @param {密码} password 
 * @param {验证码} code 
 */
export const req_register = (userName,password,code) => { 
    return axios.post(`${base}/register`, {
        userName:userName,
        password:password,
        verificationCode:code
    }).then(res => res.data); 
};
/**
 * 发送短信验证码接口
 * @param {手机号或邮箱} userName 
 */
export const req_sendSMSVCode = (phone) => { 
    return axios.get(`${base}/sendSMSCode`,{
        params:{
            phone:phone
        }
    }).then(res => res.data); 
};

/**
 * 发送邮件验证码接口
 * @param {邮箱} email 
 */
export const req_sendEmailVCode = (email) => { 
    return axios.get(`${base}/sendEmailCode`,{
            params:{
                email:email
            }
    }).then(res => res.data); 
};

/**
 * 获取权限列表
 */
export const req_getRouterList = (page,size) => { 
    return axios.get(`${api}`,{params:{
                methodName:'getPageList10020',
                parameters:"currentPage:" + Base64.encode(page) + ";pageSize:" + Base64.encode(size) 
            }
        }
     ).then(res => res.data); 
};
/**
 * 获取角色列表
 */
export const req_getRoleList = () => { 
    return axios.get(`${api}`,{params:{methodName:'getAllRoles10003'}}
     ).then(res => res.data); 
};
/**
 * 获取用户信息列表
 */
export const req_getUserInfoList = () => { 
    return axios.get(`${api}`,{params:{methodName:'getAllUserInfo10018'}}
     ).then(res => res.data); 
};
/**
 * 添加角色
 * @param {角色名} name
 * @param {角色描述} description
 */
export const addRole = (name,description) => { 
    return axios.post(
    `${api}`, { 
            methodName:'addRole10011',
            parameters:"name:" + Base64.encode(name) + ";description:" + Base64.encode(description) 
    }); 
};
/**
 * 修改角色
 * @param {角色Id} id
 * @param {角色名} name 
 * @param {角色描述} description 
 */
export const updateRole = (id,name,description) => { 
    return axios.put(
    `${api}`, { 
            methodName:'updateRole10015',
            parameters: "id:" + Base64.encode(id) 
                        +";name:" + Base64.encode(name) 
                        + ";description:" + Base64.encode(description) 
    }); 
};

/**
 * 获取登录日志
 * @param {当前页} page 
 * @param {页面大小} size 
 */
export const req_getLogonLogList = (page,size) => { 
    return axios.get(`${api}`,{params:{
                methodName:'getPageList30008',
                parameters:"currentPage:" + Base64.encode(page) + ";pageSize:" + Base64.encode(size) 
            }
        }
     ).then(res => res.data); 
};



export const getUserList = params => { return axios.get(`${api}/user/list`, { params: params }); };

export const removeUser = params => { return axios.get(`${api}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${api}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${api}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${api}/user/add`, { params: params }); };