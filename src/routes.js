import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import RouterList from './views/m_router/List.vue'
import RoleList from './views/m_role/List.vue'
import UserList from './views/m_user/List.vue'
import LogonLog from './views/m_log/LogonLog.vue'

import Table from './views/demo/Table.vue'
import Form from './views/demo/Form.vue'
import user from './views/demo/user.vue'
import echarts from './views/demo/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '权限管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/RouterList', component: RouterList, name: '权限列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/UserList', component: UserList, name: '用户列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '角色管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/RoleList', component: RoleList, name: '角色列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '日志查询/数据统计',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/LogonLog', component: LogonLog, name: '登录日志' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Demo',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
            { path: '/echarts', component: echarts, name: 'echarts' }

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;