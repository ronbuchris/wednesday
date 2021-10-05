const initialState = {
    board: null,
    boards: [],
    isViewChange: false,
    sort: {
        sortBy: '',
        sortOrder: ''
    },
    filterStore: {
        groupsIds: [],
        statuses: []
    }
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'CHANGE_VIEW':
            newState = { ...state, isViewChange: action.isViewChange }
            break
        case 'FILTER':
            newState = { ...state, filterStore: { ...action.filterStore } }
            break

        default:
    }
    return newState
}