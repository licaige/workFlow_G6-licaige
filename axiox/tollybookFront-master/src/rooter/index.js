import Home from "../container/Home";
import User from "../container/User";
import Data from "../container/Data";
import Login from '../container/Login';
import Detail from "../container/Detail";
import UserInfo from "../container/UserInfo";
import Account from "../container/Account";
import About from "../container/About";

const routes = [
    {
        path: '/',
        component: Home
    },{
        path: '/data',
        component: Data
    },{
        path: '/user',
        component: User
    },{
        path: '/login',
        component: Login
    },{
        path: '/detail',
        component: Detail
    },{
        path: '/account',
        component: Account
    },{
        path: '/about',
        component: About
    },{
        path: '/userInfo',
        component: UserInfo
    }
]

export default routes;