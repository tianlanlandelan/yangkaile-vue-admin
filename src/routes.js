import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

let routes = [
    {
        path: '/Login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/Register',
        component: Register,
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
        path: '/Home',
        component: Home,
        name: ''
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/Login' }
    }
];

export default routes;