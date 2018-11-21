import axios from 'axios';
import md5 from 'js-md5';

let base = 'api';
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
 * 获取权限列表
 */
export const req_getRouterList = () => { 
    return axios.get(`${base}`,{params:{methodName:'getAllRouters10007'}}
     ).then(res => res.data); 
};
/**
 * 获取角色列表
 */
export const req_getRoleList = () => { 
    return axios.get(`${base}`,{params:{methodName:'getAllRoles10003'}}
     ).then(res => res.data); 
};
/**
 * 获取用户信息列表
 */
export const req_getUserInfoList = () => { 
    return axios.get(`${base}`,{params:{methodName:'getAllUserInfo10018'}}
     ).then(res => res.data); 
};
/**
 * 添加角色
 * @param {角色名} name
 * @param {角色描述} description
 */
export const addRole = (name,description) => { 
    return axios.post(
    `${base}`, { 
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
    `${base}`, { 
            methodName:'updateRole10015',
            parameters: "id:" + Base64.encode(id) 
                        +";name:" + Base64.encode(name) 
                        + ";description:" + Base64.encode(description) 
    }); 
};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };