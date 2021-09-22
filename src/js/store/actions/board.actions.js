import { boardService } from "../../services/board.service"

export function loadBoard(workspace,boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(workspace,boardId)
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