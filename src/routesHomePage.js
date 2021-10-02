import { HomePage } from './js/pages/HomePage';
import { Login } from './js/pages/Login';

const routesHomePage = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: HomePage,
    }
]

export default routesHomePage;