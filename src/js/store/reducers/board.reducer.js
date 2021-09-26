const initialState = {
    board: null,
    boards:[],

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
        
        default:
    }
    return newState
}