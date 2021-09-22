import { boardService } from "../../services/board.service"

export function loadBoard(boardId, workspaces) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId, workspaces)
            console.log('board',board);
            dispatch({
                type: 'SET_BOARD',
                board
            })
        } catch (err) {
            console.log('Cannot load workspaces', err)
        }
    }
}