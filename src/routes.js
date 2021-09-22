import { HomePage } from './js/pages/HomePage'
import { Login } from './js/pages/Login'
import { MainApp } from './js/pages/MainApp';

const routes = [
    {
        path: '/',
        component: HomePage,
        label: 'logo'
    },
    {
        path: '/board',
        component: MainApp,
        label: 'App'
    },
    {
        path: '/login',
        component: Login,
        label: 'Login'
    }
]

export default routes;