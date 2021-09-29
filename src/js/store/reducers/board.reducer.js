const initialState = {
    board: null,
    boards:[],
    isViewChange:false
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards:[...state.boards, action.board] }
            break
        case 'CHANGE_VIEW':
            newState = { ...state, isViewChange: action.isViewChange}
            break
        
        default:
    }
    return newState
}