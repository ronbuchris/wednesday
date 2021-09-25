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

export function onEditBoard(boardToSave) {
    return (dispatch) => {
        boardService.save(boardToSave)
            .then(savedboard => {
                console.log('Updated board:', savedboard);
                dispatch({
                    type: 'UPDATE_BOARD',
                    board: savedboard
                })
                console.log('board updated')
            })
            .catch(err => {
                console.log('Cannot update board')
                console.log('Cannot save board', err)
            })
    }
}