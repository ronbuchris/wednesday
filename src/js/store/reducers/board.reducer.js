const initialState = {
    board: null,
    boards: [],
    labels: [],
    lastRemovedBoard: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_LABELS':
            newState = { ...state, labels: action.labels }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'EDIT_BOARD':
            console.log(`action.board`, action.board)
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        default:
    }
    return newState
}