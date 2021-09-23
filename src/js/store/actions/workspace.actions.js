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

export function loadWorkspace(workspaceId) {
    return async dispatch => {
        try {
            const workspace = await workspaceService.getById(workspaceId)
            dispatch({
                type: 'SET_WORKSPACE',
                workspace
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function addWorkspace(workspace) {
    return async dispatch => {
        try {
            const addedWorkspace = workspaceService.save(workspace)
            dispatch({
                type: 'ADD_WORKSPACE',
                addedWorkspace
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function editWorkspace(workspaceToSave) {
    return async dispatch => {
        try {
            const savedWorkspace = await workspaceService.save(workspaceToSave)
            console.log('Updated Workspace:', savedWorkspace);
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: savedWorkspace
            })
        }
        catch (err) {
            console.log('Cannot save workspace', err)
        }
    }
}

export function removeWorkspace(workspaceId) {
    return async dispatch => {
        try {
            await workspaceService.remove(workspaceId)
            dispatch({
                type: 'REMOVE_WORKSPACE',
                workspaceId
            })
        }
        catch (err) {
            console.log('Cannot remove workspace', err)
        }
    }
}