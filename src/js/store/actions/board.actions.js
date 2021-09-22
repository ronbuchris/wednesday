import { boardService } from "../../services/board.service"

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({
                type: 'SET_BOARD',
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}