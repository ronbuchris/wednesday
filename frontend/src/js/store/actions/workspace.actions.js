import { userService } from "../../services/user.service"
import { workspaceService } from "../../services/workspace.service"

export function loadWorkspaces(user) {
    return async dispatch => {
        try {
            const workspaces = await workspaceService.query(user)
            dispatch({
                type: 'SET_WORKSPACES',
                workspaces
            })
            return workspaces
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function undo(lastEditedWorkspace, boardId) {
    return async dispatch => {
        try {
            const savedWorkspace = await workspaceService.save(lastEditedWorkspace)
            const board = savedWorkspace.boards.find(gBoard => gBoard._id === boardId)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: savedWorkspace
            })
            dispatch({
                type: 'SET_BOARD',
                board
            })
            dispatch({
                type: 'SET_GROUPS',
                groups: board.groups
            })
        }
        catch (err) {
            console.log('Cannot save workspace', err)
        }
    }
}
export function saveUndoWorkspace(workspace) {
    return async dispatch => {
        try {
            dispatch({
                type: 'SET_UNDO_WORKSPACE',
                lastEditedWorkspace: workspace
            })
        }
        catch (err) {
            console.log('Cannot save workspace', err)
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

export function loadWorkspaceByBoardId(boardId,workspaces) {
    return  dispatch => {
        try {
            const workspace =  workspaceService.getByBoardId(boardId,workspaces)
            dispatch({
                type: 'SET_WORKSPACE',
                workspace
            })
        }
        catch (err) {
            console.log('Cannot remove workspace', err)
        }
    }
}

export function addWorkspace(user, title) {
    return async dispatch => {
        try {
            const userAndWorkspace = await workspaceService.addNewWorkspace(user, title)
            const userToSave = userAndWorkspace[0]
            const workspaces = await workspaceService.query(userToSave)
            await userService.save(userToSave)
            const workspace = userAndWorkspace[1]
            dispatch({
                type: 'SET_WORKSPACES',
                workspaces
            })
            dispatch({
                type: 'SET_WORKSPACE',
                workspace
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

export function toggleNav() {
    return dispatch => {
        dispatch({
            type: 'TOGGLE_NAV',
        })
    }
}




