import { workspaceService } from "../../services/workspace.service"

export function loadWorkspaces() {
    return async dispatch => {
        try {
            const workspaces = await workspaceService.query()
            dispatch({
                type: 'SET_WORKSPACES',
                workspaces
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function loadWorkspace() {
    return async dispatch => {
        try {
            const workspace = await workspaceService.query()
            dispatch({
                type: 'SET_WORKSPACES',
                workspace
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}