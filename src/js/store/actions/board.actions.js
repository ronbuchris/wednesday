import { boardService } from "../../services/board.service"
import { workspaceService } from "../../services/workspace.service";

export function loadBoard(workspace, boardId) {
    return dispatch => {
        try {
            if (!boardId) return
            const board = boardService.getById(workspace, boardId)
            console.log('board', board);
            console.log('work', workspace);
            dispatch({
                type: 'SET_BOARD',
                board
            })
            dispatch({
                type: 'SET_GROUPS',
                groups: board.groups
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}
export function setBoard() {
    return async dispatch => {
        try {
            const board = null
            dispatch({
                type: 'SET_BOARD',
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}
export function addBoard(workspace, user) {
    return async dispatch => {
        try {
            const board = await boardService.addBoard(workspace, user)
            dispatch({
                type: 'ADD_BOARD',
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}

export function removeBoard(workspace, boardId) {
    return async dispatch => {
        try {
            const newWorkspace = boardService.remove(workspace, boardId)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace
            })
        } catch (err) {
            console.log('Cannot REMOVE group', err)
        }
    }
}

export function editBoard(workspace, board, user, users) {
    return async (dispatch) => {
        try {
            const newWorkspace = boardService.save(workspace, board, user, users)
            await workspaceService.save(newWorkspace)
            dispatch({
                type: 'EDIT_WORKSPACE',
                workspace: newWorkspace,
            })
        } catch (err) {
            console.log('Cannot update board')
            console.log('Cannot save board', err)
        }
    }
}


export function toggleMenu(toggleMenus, menuToOpen, id) {
    return dispatch => {
        const newToggleMenus = boardService.toggleMenu(toggleMenus, menuToOpen, id)
        console.log(`newToggleMenus`, newToggleMenus)
        dispatch({
            type: 'TOGGLE_MENU',
            toggleMenus: newToggleMenus
        })
    }
}
