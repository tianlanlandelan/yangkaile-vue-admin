import axios from 'axios';

let base = 'api';

/**
 * 登录接口
 * @param {用户名、密码等参数} params 
 */
export const req_logon = params => { 
    return axios.post(`${base}/logon`, params).then(res => res.data); 
};

export const req_getRouterList = () => { 
    return axios.get(`${base}`,{params:{methodName:'getAllRouters10007'}}
     ).then(res => res.data); 
};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };