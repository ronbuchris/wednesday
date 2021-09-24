import { HomePage } from './js/pages/HomePage';
import { Login } from './js/pages/Login';

const routesHomePage = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/login',
        component: Login,
    }
]

export default routesHomePage;