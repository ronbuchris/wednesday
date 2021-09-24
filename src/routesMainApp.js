import { BoardDetails } from './js/pages/BoardDetails';
import { UserDetails } from './js/pages/UserDetails';
import { MainApp } from './js/pages/MainApp';
import { WorkspaceDetails } from './js/pages/WorkspaceDetails';

const routesMainApp = [
    {
        path: '/',
        component: MainApp,
    },
    {
        path: '/board/:boardId',
        component: BoardDetails,
    },
    {
        path: '/user/:userId',
        component: UserDetails,
    },
    {
        path: '/workspace/:workspaceId',
        component: WorkspaceDetails,
    },
]

export default routesMainApp;