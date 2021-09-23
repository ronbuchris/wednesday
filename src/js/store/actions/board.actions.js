import { boardService } from "../../services/board.service"

export function loadBoard(workspace,boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(workspace,boardId)
            dispatch({
                type: 'SET_BOARD',
                board
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
export function addBoard(workspace,user) {
    return async dispatch => {
        try {
            const board = boardService.addBoard(workspace, user)
            dispatch({
                type: 'ADD_BOARD',
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}