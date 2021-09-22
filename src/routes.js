import { HomePage } from './js/pages/HomePage'
import { Login } from './js/pages/Login'

const routes = [
    {
        path: '/',
        component: HomePage,
        label:'logo'
    },
    {
        path: '/login',
        component: Login,
        label:'Login'
    }
]

export default routes;