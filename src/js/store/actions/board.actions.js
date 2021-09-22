import { boardService } from "../../services/board.service"

export function loadBoards(filterBy) {
    return (dispatch) => {
        boardService.query(filterBy)
            .then(boards => {
                console.log('Boards from DB:', boards)
                dispatch({
                    type: 'SET_TOYS',
                    boards
                })
            })
            .catch(err => {
                // showErrorMsg('Cannot load boards')
                console.log('Cannot load boards', err)
            })

        boardService.subscribe((boards) => {
            console.log('Got notified');
            dispatch({
                type: 'SET_TOYS',
                boards
            })
        })
    }
}

