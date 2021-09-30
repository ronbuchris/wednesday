import { boardService } from "../../services/board.service"
import { workspaceService } from "../../services/workspace.service";

export function loadBoard(workspace, boardId) {
    return dispatch => {
        try {
            if (!boardId) return
            const board = boardService.getById(workspace, boardId)
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



export function changeView(isViewChange) {
    return async dispatch => {
        console.log(isViewChange);
        try {
            dispatch({
                type: 'CHANGE_VIEW',
                isViewChange
            })
        } catch (err) {
            console.log('Cannot REMOVE group', err)
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

export function editBoard(workspace, boardOrTitle, user, users) {
    console.log('title',boardOrTitle);
    return async (dispatch) => {
        try {
            const newWorkspace = boardService.save(workspace, boardOrTitle, user, users)
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

export function dragAndDrop(workspace,board,result,groupId) {
    return async dispatch => {
        try {
            const newWorkspace=boardService.dragAndDrop(workspace,board,result,groupId)
            const workspaceToSave=newWorkspace[0]
            await workspaceService.save(workspaceToSave);
            const newBoard=newWorkspace[1]
            dispatch({
                type: 'SET_WORKSPACE',
                workspace:workspaceToSave,
            })
            dispatch({
                type: 'SET_BOARD',
                board:newBoard,
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}